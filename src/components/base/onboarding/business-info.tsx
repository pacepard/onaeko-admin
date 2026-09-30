import { RouteURL } from '@/routes/paths';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@onaeko/ui/button';
import { Input } from '@onaeko/ui/input';
import { Label } from '@onaeko/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@onaeko/ui/select';
import { cn } from '@onaeko/ui';
import { OnaekoAPI } from '@/api/base/config';
import {
    OrganisationType,
    SchoolRole,
    UniversityKind,
    UserType,
} from '@/utils/enums.util';
import {
    isOrganisationType,
    organisationOptions,
    organisationTypeLabel,
    schoolRoleOptions,
    universityKindOptions,
} from '@/utils/organisation';
import storage from '@/services/storage';
import { toast } from '@onaeko/ui';
import { getOnboardingRoute } from '@/utils/onboarding';

const ORGANISATION_TYPE_KEY = 'organisationType';

const organisationInfoSchema = z
    .object({
        organisationName: z
            .string()
            .min(1, 'Organisation name is required')
            .trim(),
        organisationType: z.nativeEnum(OrganisationType, {
            message: 'Organisation type is required',
        }),
        schoolRole: z.nativeEnum(SchoolRole).optional(),
        universityKind: z.nativeEnum(UniversityKind).optional(),
    })
    .superRefine((data, ctx) => {
        if (
            data.organisationType === OrganisationType.SCHOOL &&
            !data.schoolRole
        ) {
            ctx.addIssue({
                code: 'custom',
                path: ['schoolRole'],
                message: 'Select your role at the school',
            });
        }
        if (
            data.organisationType === OrganisationType.UNIVERSITY &&
            !data.universityKind
        ) {
            ctx.addIssue({
                code: 'custom',
                path: ['universityKind'],
                message: 'Select university type',
            });
        }
    });

type OrganisationInfoFormValues = z.infer<typeof organisationInfoSchema>;

function resolveIndustry(data: OrganisationInfoFormValues): string {
    switch (data.organisationType) {
        case OrganisationType.SCHOOL:
            return data.schoolRole ?? 'school';
        case OrganisationType.UNIVERSITY:
            return data.universityKind ?? 'university';
        case OrganisationType.NONPROFIT:
            return 'reach-customer-acquisition';
        case OrganisationType.UTME_TUTORIAL_CENTRE:
            return 'utme-preparation';
        case OrganisationType.ONAEKO_TEAM:
            return 'internal';
        default:
            return 'other';
    }
}

const BusinessInfo: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const storedType = storage.fetchLegacy(ORGANISATION_TYPE_KEY);
    const defaultOrganisationType = isOrganisationType(storedType ?? '')
        ? (storedType as OrganisationType)
        : undefined;

    useEffect(() => {
        const checkOnboardingStatus = async () => {
            if (!storage.checkToken()) {
                return;
            }

            try {
                const statusResponse =
                    await OnaekoAPI.user.getOnboardingStatus();

                if (statusResponse.error === false && statusResponse.data) {
                    const statusData = statusResponse.data as any;
                    const step = statusData.step || 0;
                    const status = statusData.status || 'not-started';
                    const userTypeFromStatus = statusData.userType;

                    if (step < 2) {
                        navigate(RouteURL.onboardingBasicInfo);
                    } else if (step >= 3) {
                        const route = getOnboardingRoute(
                            step,
                            status,
                            userTypeFromStatus,
                        );
                        navigate(route);
                    } else if (
                        userTypeFromStatus !== UserType.ADMIN &&
                        userTypeFromStatus !== 'admin' &&
                        userTypeFromStatus !== UserType.BUSINESS &&
                        userTypeFromStatus !== 'business'
                    ) {
                        navigate(RouteURL.onboardingUserInfo);
                    }
                }
            } catch (error) {
                console.error('Error checking onboarding status:', error);
            }
        };

        checkOnboardingStatus();
    }, [navigate]);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<OrganisationInfoFormValues>({
        resolver: zodResolver(organisationInfoSchema),
        defaultValues: {
            organisationName: '',
            organisationType: defaultOrganisationType,
            schoolRole: undefined,
            universityKind: undefined,
        },
    });

    const organisationType = watch('organisationType');
    const schoolRole = watch('schoolRole');
    const universityKind = watch('universityKind');

    const onSubmit = async (data: OrganisationInfoFormValues) => {
        setIsLoading(true);
        try {
            storage.keepLegacy(ORGANISATION_TYPE_KEY, data.organisationType);

            if (!storage.checkToken()) {
                storage.keepLegacy('businessName', data.organisationName);
                navigate(RouteURL.onboardingCreateWorkspace);
                toast.success('Organisation information saved');
                return;
            }

            const response = await OnaekoAPI.user.setBusinessInfo({
                businessName: data.organisationName,
                businessType: data.organisationType,
                industry: resolveIndustry(data),
                tags: [
                    data.organisationType,
                    ...(data.schoolRole ? [data.schoolRole] : []),
                    ...(data.universityKind ? [data.universityKind] : []),
                ],
            });

            if (
                response.error === false &&
                (response.status === 200 || response.status === 201)
            ) {
                storage.keepLegacy('businessName', data.organisationName);
                navigate(RouteURL.onboardingCreateWorkspace);
                toast.success('Organisation information saved');
            } else {
                setError('root', {
                    type: 'server',
                    message:
                        response.message ||
                        'Failed to save information. Please try again.',
                });
            }
        } catch (error) {
            console.error('Error submitting organisation info:', error);
            setError('root', {
                type: 'server',
                message: 'An error occurred. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        navigate(RouteURL.onboardingBasicInfo);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen py-12 px-4">
            <div className="w-full max-w-md mx-auto space-y-8">
                <div className="text-center space-y-3">
                    <h1 className="text-4xl font-semibold text-foreground tracking-tight">
                        Tell us about your organisation
                    </h1>
                    <p className="text-base text-muted-foreground">
                        {organisationType
                            ? `Setting up as ${organisationTypeLabel(organisationType)}.`
                            : 'We need a few details to configure your admin workspace.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label
                            htmlFor="organisationName"
                            className="text-sm font-medium text-foreground"
                        >
                            Organisation Name *
                        </Label>
                        <Input
                            id="organisationName"
                            type="text"
                            placeholder="e.g. Greenfield Secondary School"
                            {...register('organisationName')}
                            className={cn(
                                errors.organisationName && 'border-destructive',
                            )}
                        />
                        {errors.organisationName && (
                            <p className="text-sm text-destructive">
                                {errors.organisationName.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="organisationType"
                            className="text-sm font-medium text-foreground"
                        >
                            Organisation Type *
                        </Label>
                        <Select
                            value={organisationType}
                            onValueChange={(value) => {
                                setValue(
                                    'organisationType',
                                    value as OrganisationType,
                                );
                                setValue('schoolRole', undefined);
                                setValue('universityKind', undefined);
                            }}
                        >
                            <SelectTrigger
                                id="organisationType"
                                className={cn(
                                    'w-full',
                                    errors.organisationType &&
                                        'border-destructive',
                                )}
                            >
                                <SelectValue placeholder="Select organisation type" />
                            </SelectTrigger>
                            <SelectContent>
                                {organisationOptions.map((opt) => (
                                    <SelectItem key={opt.id} value={opt.id}>
                                        {opt.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.organisationType && (
                            <p className="text-sm text-destructive">
                                {errors.organisationType.message}
                            </p>
                        )}
                    </div>

                    {organisationType === OrganisationType.SCHOOL && (
                        <div className="space-y-2">
                            <Label
                                htmlFor="schoolRole"
                                className="text-sm font-medium text-foreground"
                            >
                                Your Role *
                            </Label>
                            <Select
                                value={schoolRole}
                                onValueChange={(value) =>
                                    setValue(
                                        'schoolRole',
                                        value as SchoolRole,
                                    )
                                }
                            >
                                <SelectTrigger
                                    id="schoolRole"
                                    className={cn(
                                        'w-full',
                                        errors.schoolRole &&
                                            'border-destructive',
                                    )}
                                >
                                    <SelectValue placeholder="Teacher, parent/guardian, or counsellor" />
                                </SelectTrigger>
                                <SelectContent>
                                    {schoolRoleOptions.map((opt) => (
                                        <SelectItem
                                            key={opt.value}
                                            value={opt.value}
                                        >
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.schoolRole && (
                                <p className="text-sm text-destructive">
                                    {errors.schoolRole.message}
                                </p>
                            )}
                        </div>
                    )}

                    {organisationType === OrganisationType.UNIVERSITY && (
                        <div className="space-y-2">
                            <Label
                                htmlFor="universityKind"
                                className="text-sm font-medium text-foreground"
                            >
                                University Type *
                            </Label>
                            <Select
                                value={universityKind}
                                onValueChange={(value) =>
                                    setValue(
                                        'universityKind',
                                        value as UniversityKind,
                                    )
                                }
                            >
                                <SelectTrigger
                                    id="universityKind"
                                    className={cn(
                                        'w-full',
                                        errors.universityKind &&
                                            'border-destructive',
                                    )}
                                >
                                    <SelectValue placeholder="Private, federal, or state" />
                                </SelectTrigger>
                                <SelectContent>
                                    {universityKindOptions.map((opt) => (
                                        <SelectItem
                                            key={opt.value}
                                            value={opt.value}
                                        >
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.universityKind && (
                                <p className="text-sm text-destructive">
                                    {errors.universityKind.message}
                                </p>
                            )}
                        </div>
                    )}

                    {organisationType === OrganisationType.NONPROFIT && (
                        <p className="text-sm text-muted-foreground rounded-md border border-border px-3 py-2">
                            Nonprofits on Onaeko use a reach and customer
                            acquisition model. We&apos;ll configure your
                            workspace accordingly.
                        </p>
                    )}

                    {errors.root && (
                        <p className="text-sm text-destructive">
                            {errors.root.message}
                        </p>
                    )}

                    <div className="space-y-3 pt-2">
                        <Button
                            type="submit"
                            disabled={isSubmitting || isLoading}
                            className="w-full h-10"
                        >
                            {isLoading
                                ? 'Loading...'
                                : 'Continue to workspace'}
                        </Button>
                        <button
                            type="button"
                            onClick={handleBack}
                            className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                        >
                            Back
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BusinessInfo;

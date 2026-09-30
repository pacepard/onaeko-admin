import { RouteURL } from '@/routes/paths';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@onaeko/ui/button';
import { Card, CardContent } from '@onaeko/ui/card';
import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@onaeko/ui';
import { OrganisationType, UserType } from '@/utils/enums.util';
import { organisationOptions } from '@/utils/organisation';
import UserContext from '@/context/user/userContext';
import storage from '@/services/storage';
import { OnaekoAPI } from '@/api/base/config';
import { toast } from '@onaeko/ui';
import { getOnboardingRoute } from '@/utils/onboarding';

const ORGANISATION_TYPE_KEY = 'organisationType';

const Onboard: React.FC = () => {
    const [selectedType, setSelectedType] = useState<OrganisationType | null>(
        null,
    );
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const { setUserType } = useContext(UserContext) || {};

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
                    const userType = statusData.userType;

                    if (step > 0 || status !== 'not-started') {
                        const route = getOnboardingRoute(
                            step,
                            status,
                            userType,
                        );
                        navigate(route);
                    }
                }
            } catch (err) {
                console.error('Error checking onboarding status:', err);
            }
        };

        checkOnboardingStatus();
    }, [navigate]);

    const handleContinue = async () => {
        if (!selectedType || !setUserType) {
            return;
        }

        setIsLoading(true);
        setError('');
        try {
            storage.keepLegacy(ORGANISATION_TYPE_KEY, selectedType);

            // Admin orgs always use the Organisations (admin) user type.
            if (!storage.checkToken()) {
                setUserType(UserType.ADMIN);
                navigate(RouteURL.onboardingBasicInfo);
                toast.success('Organisation type selected');
                return;
            }

            const response = await OnaekoAPI.user.setUserType({
                userType: UserType.ADMIN,
            });

            if (
                response.error === false &&
                (response.status === 200 || response.status === 201)
            ) {
                setUserType(UserType.ADMIN);
                navigate(RouteURL.onboardingBasicInfo);
                toast.success('Organisation type selected');
            } else {
                setError(
                    response.message ||
                        'Failed to set organisation type. Please try again.',
                );
            }
        } catch (err) {
            console.error('Error setting organisation type:', err);
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full space-y-8">
            <div className="text-center space-y-2 w-full max-w-3xl mx-auto">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Organisations
                </p>
                <h1 className="text-3xl md:text-4xl font-semibold text-foreground">
                    What kind of organisation are you?
                </h1>
                <p className="text-lg text-muted-foreground">
                    Onaeko Admin is for organisation accounts. We&apos;ll tailor
                    setup to your type.
                </p>
            </div>

            <div className="flex flex-col md:flex-row md:flex-wrap items-stretch justify-center gap-6 w-full max-w-5xl mx-auto md:px-4">
                {organisationOptions.map((option) => {
                    const isSelected = selectedType === option.id;

                    return (
                        <Card
                            key={option.id}
                            className={cn(
                                'relative cursor-pointer transition-all duration-200 hover:shadow-md',
                                'flex-1 basis-0 min-w-[260px] md:min-w-[280px] max-w-[340px]',
                                isSelected
                                    ? 'border-primary border-2 shadow-md'
                                    : 'border-border hover:border-primary/50',
                            )}
                            onClick={() => setSelectedType(option.id)}
                        >
                            <div className="absolute top-4 right-4 z-10">
                                {isSelected ? (
                                    <CheckCircle2 className="size-6 text-primary fill-primary" />
                                ) : (
                                    <Circle className="size-6 text-muted-foreground" />
                                )}
                            </div>

                            <CardContent className="pt-6 pb-6 px-6 h-full">
                                <div className="flex flex-col items-center text-center space-y-4 h-full">
                                    <div
                                        className={cn(
                                            'w-full flex items-center justify-center transition-all duration-200 flex-shrink-0',
                                            isSelected
                                                ? 'scale-105'
                                                : 'scale-100',
                                        )}
                                    >
                                        <img
                                            src={option.image}
                                            alt={option.alt}
                                            className={cn(
                                                'w-full h-auto object-contain',
                                                'max-h-[140px] md:max-h-[160px]',
                                                isSelected
                                                    ? 'opacity-100'
                                                    : 'opacity-80',
                                            )}
                                        />
                                    </div>

                                    <h3 className="text-xl font-semibold text-foreground">
                                        {option.title}
                                    </h3>

                                    <p className="text-sm text-muted-foreground">
                                        {option.description}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {error && (
                <div className="w-full flex justify-center pt-2">
                    <p className="text-sm text-destructive text-center">
                        {error}
                    </p>
                </div>
            )}

            <div className="w-full flex justify-center pt-4">
                <Button
                    onClick={handleContinue}
                    disabled={!selectedType || isLoading}
                    size="lg"
                    className="min-w-[200px]"
                >
                    {isLoading ? 'Loading...' : 'Continue'}
                </Button>
            </div>
        </div>
    );
};

export default Onboard;

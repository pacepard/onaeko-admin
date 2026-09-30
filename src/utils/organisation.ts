import {
    OrganisationType,
    SchoolRole,
    UniversityKind,
} from '@/utils/enums.util';

export interface OrganisationOption {
    id: OrganisationType;
    title: string;
    description: string;
    image: string;
    alt: string;
}

/** Organisations category options for Onaeko Admin onboarding. */
export const organisationOptions: OrganisationOption[] = [
    {
        id: OrganisationType.SCHOOL,
        title: 'Schools',
        description: 'Teachers, parents/guardians, and counsellors',
        image: '/items/Affiliate-Program.png',
        alt: 'Schools organisation illustration',
    },
    {
        id: OrganisationType.UNIVERSITY,
        title: 'University',
        description: 'Private, federal, and state institutions',
        image: '/items/Planning-A-Trip.png',
        alt: 'University organisation illustration',
    },
    {
        id: OrganisationType.UTME_TUTORIAL_CENTRE,
        title: 'UTME Tutorial Centres',
        description: 'Centres preparing candidates for UTME',
        image: '/items/Peace.png',
        alt: 'UTME tutorial centre illustration',
    },
    {
        id: OrganisationType.NONPROFIT,
        title: 'Nonprofits',
        description: 'Reach and customer acquisition programmes',
        image: '/items/Affiliate-Program.png',
        alt: 'Nonprofit organisation illustration',
    },
    {
        id: OrganisationType.ONAEKO_TEAM,
        title: 'The Onaeko Team',
        description: 'Internal Onaeko staff and operators',
        image: '/items/Peace.png',
        alt: 'Onaeko team illustration',
    },
];

export const schoolRoleOptions = [
    { value: SchoolRole.TEACHER, label: 'Teacher' },
    { value: SchoolRole.PARENT_GUARDIAN, label: 'Parent / Guardian' },
    { value: SchoolRole.COUNSELLOR, label: 'Counsellor' },
];

export const universityKindOptions = [
    { value: UniversityKind.PRIVATE, label: 'Private' },
    { value: UniversityKind.FEDERAL, label: 'Federal' },
    { value: UniversityKind.STATE, label: 'State' },
];

export function organisationTypeLabel(type: OrganisationType | string): string {
    const match = organisationOptions.find((o) => o.id === type);
    return match?.title ?? type;
}

export function isOrganisationType(value: string): value is OrganisationType {
    return Object.values(OrganisationType).includes(value as OrganisationType);
}

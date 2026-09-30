import type { ReactNode } from 'react';
import type { IRoute } from '@/utils/interfaces.util';
import { RouteURL } from './paths';
import { OnboardingLayout } from '@/components/layouts/onboarding-layout';
import Onboard from '@/components/base/onboarding/onboard';
import BasicInfo from '@/components/base/onboarding/basic-info';
import UserInfo from '@/components/base/onboarding/user-info';
import BusinessInfo from '@/components/base/onboarding/business-info';
import CreateWorkspace from '@/components/base/onboarding/create-workspace';
import InviteTeammates from '@/components/base/onboarding/invite-teammates';

function withOnboardingLayout(children: ReactNode) {
    return (
        <OnboardingLayout title="Onboarding" logo="">
            {children}
        </OnboardingLayout>
    );
}

const onboardingRoutes: Array<IRoute> = [
    {
        name: 'onboarding',
        path: RouteURL.onboarding,
        element: withOnboardingLayout(<Onboard />),
    },
    {
        name: 'onboard-basic-user',
        path: RouteURL.onboardingBasicInfo,
        element: withOnboardingLayout(<BasicInfo />),
    },
    {
        name: 'onboard-user-info',
        path: RouteURL.onboardingUserInfo,
        element: withOnboardingLayout(<UserInfo />),
    },
    {
        name: 'onboard-business-info',
        path: RouteURL.onboardingBusinessInfo,
        element: withOnboardingLayout(<BusinessInfo />),
    },
    {
        name: 'onboard-create-workspace',
        path: RouteURL.onboardingCreateWorkspace,
        element: withOnboardingLayout(<CreateWorkspace />),
    },
    {
        name: 'onboard-invite-teammates',
        path: RouteURL.onboardingInviteTeammates,
        element: withOnboardingLayout(<InviteTeammates />),
    },
];

export default onboardingRoutes;

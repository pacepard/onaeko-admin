/** Browser / React Router paths for admin.onaeko.com */

const AppURL = import.meta.env.VITE_APP_URL ?? '';

export const RouteURL = {
    // Root
    home: '/',

    // Onboarding (Organisations / admin)
    onboarding: '/onboarding',
    onboardingBasicInfo: '/onboarding/basic-info',
    onboardingUserInfo: '/onboarding/user-info',
    onboardingBusinessInfo: '/onboarding/business-info',
    onboardingCreateWorkspace: '/onboarding/create-workspace',
    onboardingInviteTeammates: '/onboarding/invite-teammates',

    // Post-onboarding admin home
    admin: '/admin',
    dashboard: '/admin',

    // Kept for shared utils / API callbacks (not mounted as auth UI)
    login: '/login',
    logout: '/logout',
    register: '/register',
    myAccount: '/admin',

    /** @deprecated Use RouteURL.admin */
    learn: '/admin',
    programs: '/programs',
    courses: '/courses',
    scholarships: '/scholarships',

    regCallback: `${AppURL}/onboarding`,
    subCallback: `${AppURL}/admin`,
};

/**
 * Backend HTTP paths (axios baseURL + path).
 * Aligned with onaeko-api / @onaeko/sdk — not browser routes.
 */

export const ApiPath = {
    // Auth
    login: '/auth/login',
    register: '/auth/register',
    activate: '/auth/activate',
    verifyEmail: '/auth/verify-email',
    verifyOtp: '/auth/verify-otp',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    resendOtp: '/auth/resend-otp',
    token: '/auth/token',
    logout: '/auth/logout',
    loggedInUser: '/user/',
    continue: '/auth/continue',

    // OAuth
    oauthGoogle: '/auth/oauth/google',
    oauthGithub: '/auth/oauth/github',
    oauthCallback: '/auth/oauth/callback',

    // Users / talents
    users: '/users',
    user: '/user',
    talents: '/talents',
    updatePassword: '/users/update-password',

    // Onboarding (user resource)
    onboardUserType: '/user/onboard/user-type',
    onboardBasicInfo: '/user/onboard/basic-info',
    onboardUserInfo: '/user/onboard/user-info',
    onboardTalentInfo: '/user/onboard/talent-info',
    onboardBusinessInfo: '/user/onboard/business-info',
    onboardComplete: '/user/onboard/complete',
    onboardStatus: '/user/onboard/status',

    // Account
    account: '/account',
    profile: '/account/profile',
    security: '/account/security',
    twoFactor: '/account/security/2fa',
    sessions: '/account/sessions',
    billing: '/account/billing',
    paymentMethods: '/account/billing/payment-methods',
    invoices: '/account/billing/invoices',
    deleteAccount: '/account',

    // Billing catalog
    plans: '/plans',
    subscriptions: '/subscriptions',
    transactions: '/transactions',

    // Workspace / storage (onboarding)
    workspace: '/workspace',
    storageUpload: '/storage/upload',

    programs: '/programs/',
    adminPrograms: '/admin/programs',
    adminProgram: (id: string) => `/admin/programs/${id}`,
    adminEvents: (programId: string) => `/admin/programs/${programId}/events`,
    adminEvent: (programId: string, eventId: string) =>
        `/admin/programs/${programId}/events/${eventId}`,
    courses: '/courses/',
    adminCourses: '/admin/courses',
    adminCourse: (id: string) => `/admin/courses/${id}`,
    adminModules: (courseId: string) => `/admin/courses/${courseId}/modules`,
    adminModule: (courseId: string, moduleId: string) =>
        `/admin/courses/${courseId}/modules/${moduleId}`,
    adminScholarships: '/admin/scholarships',
    adminScholarship: (id: string) => `/admin/scholarships/${id}`,
} as const;

export type ApiPathKey = keyof typeof ApiPath;

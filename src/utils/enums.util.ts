export enum NodeEnv {
    LOCAL = 'local',
    DEVELOPMENT = 'development',
    STAGING = 'staging',
    PRODUCTION = 'production',
    SELF_HOSTED = 'self-hosted',
}

export const NODE_ENV: NodeEnv = import.meta.env.VITE_ENVIRONMENT as NodeEnv;

export enum ENVType {
    PRODUCTION = 'production',
    STAGING = 'staging',
    DEVELOPMENT = 'development',
}

export enum AppChannel {
    WEB = 'web',
    MOBILE = 'mobile',
    DESKTOP = 'desktop',
}

export enum HeaderType {
    IDEMPOTENT = 'x-idempotent-key',
}
export enum CookieKeyType {
    XHIT = 'x-hit',
}

export enum PasswordType {
    USERGENERATED = 'user-generated',
    SYSTEMGENERATED = 'system-generated',
    TEMPORARY = 'temporary',
    SELF = 'self',
    GENERATED = 'generated',
    SELF_CHANGED = 'self-changed',
}

export enum CurrencyType {
    NGN = 'NGN',
    USD = 'USD',
}

export const UserEnum = {
    SUPER: 'superadmin',
    ADMIN: 'admin',
    BUSINESS: 'business',
    TALENT: 'talent',
    USER: 'user',
} as const;

/**
 * Onaeko Admin user types.
 * Organisation admins use `ADMIN` — the Organisations category.
 */
export enum UserType {
    SUPER = 'super',
    ADMIN = 'admin',
    BUSINESS = 'business',
    TALENT = 'talent',
    USER = 'user',
}

/** Organisation subtypes under the Organisations (admin) category. */
export enum OrganisationType {
    SCHOOL = 'school',
    UNIVERSITY = 'university',
    UTME_TUTORIAL_CENTRE = 'utme-tutorial-centre',
    NONPROFIT = 'nonprofit',
    ONAEKO_TEAM = 'onaeko-team',
}

/** Roles within Schools organisations. */
export enum SchoolRole {
    TEACHER = 'teacher',
    PARENT_GUARDIAN = 'parent-guardian',
    COUNSELLOR = 'counsellor',
}

/** University ownership / sector kinds. */
export enum UniversityKind {
    PRIVATE = 'private',
    FEDERAL = 'federal',
    STATE = 'state',
}

/** @deprecated Prefer OrganisationType for Onaeko Admin. */
export enum BusinessType {
    SCHOOL = 'school',
    UNIVERSITY = 'university',
    UTME_TUTORIAL_CENTRE = 'utme-tutorial-centre',
    NONPROFIT = 'nonprofit',
    ONAEKO_TEAM = 'onaeko-team',
    COMPANY = 'company',
    GOVERNMENT = 'government',
    EDUCATION = 'education',
    PARTNER = 'partner',
    OTHER = 'other',
}

export enum OtpType {
    REGISTER = 'register',
    LOGIN = 'login',
    GENERIC = 'generic',
    ACTIVATEACCOUNT = 'activate-account',
    CHANGEPASSWORD = 'change-password',
    FORGOTPASSWORD = 'forgot-password',
}

export const csv = (value: string): string[] =>
    value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);

export type ProgramForm = {
    title: string;
    slug: string;
    description: string;
    hostName: string;
    partnerName: string;
    outcomes: string;
    whoFor: string;
    whoNotFor: string;
    tags: string;
    facultyName: string;
    facultyTitle: string;
    status: 'draft' | 'published';
};

export const programPayload = (form: ProgramForm) => ({
    title: form.title,
    slug: form.slug,
    description: form.description,
    hostName: form.hostName,
    partnerName: form.partnerName,
    outcomes: csv(form.outcomes),
    whoFor: csv(form.whoFor),
    whoNotFor: csv(form.whoNotFor),
    tags: csv(form.tags),
    faculty: form.facultyName
        ? [{ name: form.facultyName, title: form.facultyTitle }]
        : [],
    status: form.status,
});

export type CourseForm = {
    title: string;
    slug: string;
    description: string;
    price: string;
    scholarshipPrice: string;
    shopUrl: string;
    hostName: string;
    status: 'draft' | 'published';
    scholarshipEnabled: boolean;
};

export const coursePayload = (form: CourseForm) => ({
    title: form.title,
    slug: form.slug,
    description: form.description,
    price: Number(form.price),
    scholarshipPrice: Number(form.scholarshipPrice),
    currency: 'NGN',
    payment: {
        provider: 'paystack',
        shopUrl: form.shopUrl,
    },
    hostName: form.hostName,
    status: form.status,
    scholarshipEnabled: form.scholarshipEnabled,
});

export type EventForm = {
    title: string;
    description: string;
    scheduledAt: string;
    endsAt: string;
    hostName: string;
    meetingUrl: string;
    recordingUrl: string;
    timezone: string;
    venue: string;
};

export const eventPayload = (form: EventForm) => ({
    title: form.title,
    description: form.description,
    scheduledAt: form.scheduledAt,
    endsAt: form.endsAt,
    hosts: form.hostName ? [{ name: form.hostName }] : [],
    meetingUrl: form.meetingUrl,
    recordingUrl: form.recordingUrl,
    timezone: form.timezone || 'Africa/Lagos',
    venue: form.venue || 'Zoom',
    status: 'published',
});

export type ModuleForm = {
    title: string;
    description: string;
    order: number;
    startsAt: string;
    endsAt: string;
    instructorName: string;
    meetingUrl: string;
    recordingUrl: string;
};

export const modulePayload = (form: ModuleForm) => ({
    title: form.title,
    description: form.description,
    order: form.order,
    startsAt: form.startsAt,
    endsAt: form.endsAt,
    instructor: form.instructorName ? { name: form.instructorName } : undefined,
    meetingUrl: form.meetingUrl,
    recording: form.recordingUrl
        ? { url: form.recordingUrl, availableAt: form.startsAt }
        : undefined,
    timezone: 'Africa/Lagos',
    venue: 'Zoom',
});

export const rowsOf = (data: unknown): Array<Record<string, unknown>> => {
    if (Array.isArray(data)) return data as Array<Record<string, unknown>>;
    if (data && typeof data === 'object' && Array.isArray((data as { items?: unknown }).items)) {
        return (data as { items: Array<Record<string, unknown>> }).items;
    }
    return [];
};

export const entityId = (row: Record<string, unknown> | null | undefined): string =>
    String(row?._id || row?.id || '');

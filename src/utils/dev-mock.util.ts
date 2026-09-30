/**
 * P083 local mock UI rail — developer click-through only.
 * Keep imports relative (no `@/`) so `tsx --test` can load this module.
 */

export const DEV_MOCK_TOKEN = 'dev-mock-token';

type MockCallParams = {
    method?: string;
    path?: string;
    payload?: unknown;
    type?: string;
    isAuth?: boolean;
};

export type MockApiResponse = {
    error: boolean;
    errors: unknown[];
    data: unknown;
    message: string;
    status: number;
};

/** Pure gate — unit-tested. Staging/prod ignore the flag even if set. */
export function isUseMocksEnabled(
    environment: string | undefined,
    useMocksFlag: string | undefined,
): boolean {
    return environment === 'local' && useMocksFlag === 'true';
}

export const USE_MOCKS = isUseMocksEnabled(
    import.meta.env?.VITE_ENVIRONMENT,
    import.meta.env?.VITE_USE_MOCKS,
);

export function ok(
    data: unknown,
    message = 'Request completed successfully',
): MockApiResponse {
    return { error: false, errors: [], data, message, status: 200 };
}

export function fail(
    status: number,
    message: string,
    errors: string[] = [message],
): MockApiResponse {
    return { error: true, errors, data: {}, message, status };
}

const PROGRAM = {
    _id: 'prog-ai-education',
    id: 'prog-ai-education',
    slug: 'ai-education',
    title: 'Project: AI Education for everyone',
    status: 'published',
};

const COURSE = {
    _id: 'course-growth-engineering',
    id: 'course-growth-engineering',
    slug: 'growth-engineering',
    title: 'Growth Engineering',
    price: 15000000,
    scholarshipPrice: 5000000,
    status: 'published',
};

const SCHOLARSHIP = {
    _id: 'sch-1',
    id: 'sch-1',
    courseSlug: 'growth-engineering',
    status: 'pending',
    applicantName: 'Damola Oladipo',
    email: 'damola@example.invalid',
};

export function ensureMockSession(): void {
    if (!USE_MOCKS || typeof localStorage === 'undefined') {
        return;
    }
    if (!localStorage.getItem('token')) {
        localStorage.setItem('token', DEV_MOCK_TOKEN);
        localStorage.setItem('userId', 'mock-user-damola');
        localStorage.setItem('role', 'admin');
        localStorage.setItem('userType', 'admin');
        localStorage.setItem('userEmail', 'damola@example.invalid');
    }
}

export async function mockCall(params: MockCallParams): Promise<MockApiResponse> {
    const method = (params.method || 'GET').toUpperCase();
    const path = params.path || '';
    const payload = (params.payload || {}) as Record<string, unknown>;

    console.log(`[MOCK] ${method} ${path}`);

    if (method === 'GET' && (path === '/user' || path === '/user/' || path.startsWith('/user'))) {
        return ok({
            _id: 'mock-user-damola',
            firstName: 'Damola',
            lastName: 'Oladipo',
            email: 'damola@example.invalid',
        });
    }

    if (
        method === 'POST' &&
        (path.includes('/auth/login') ||
            path.includes('/auth/register') ||
            path.includes('/auth/activate'))
    ) {
        return ok({
            token: DEV_MOCK_TOKEN,
            _id: 'mock-user-damola',
            userType: 'admin',
            email: 'damola@example.invalid',
        });
    }

    if (method === 'GET' && path === '/admin/programs') {
        return ok({ items: [PROGRAM], programs: [PROGRAM] });
    }

    if (method === 'POST' && path === '/admin/programs') {
        return ok({ ...PROGRAM, ...payload, _id: 'prog-new' });
    }

    if (method === 'PATCH' && path.startsWith('/admin/programs/')) {
        return ok({ ...PROGRAM, ...payload });
    }

    if (method === 'GET' && /\/admin\/programs\/[^/]+\/events$/.test(path)) {
        return ok({
            items: [
                {
                    _id: 'evt-1',
                    title: 'Kickoff',
                    startsAt: '2026-09-20T15:00:00.000Z',
                    timezone: 'Africa/Lagos',
                },
            ],
        });
    }

    if (method === 'POST' && /\/admin\/programs\/[^/]+\/events$/.test(path)) {
        return ok({ _id: 'evt-new', ...payload });
    }

    if (method === 'GET' && path === '/admin/courses') {
        return ok({ items: [COURSE], courses: [COURSE] });
    }

    if (method === 'POST' && path === '/admin/courses') {
        return ok({ ...COURSE, ...payload, _id: 'course-new' });
    }

    if (method === 'PATCH' && path.startsWith('/admin/courses/')) {
        return ok({ ...COURSE, ...payload });
    }

    if (method === 'GET' && /\/admin\/courses\/[^/]+\/modules$/.test(path)) {
        return ok({
            items: [{ _id: 'mod-1', title: 'Module 01', order: 1 }],
        });
    }

    if (method === 'POST' && /\/admin\/courses\/[^/]+\/modules$/.test(path)) {
        return ok({ _id: 'mod-new', ...payload });
    }

    if (method === 'GET' && path === '/admin/scholarships') {
        return ok({ items: [SCHOLARSHIP], scholarships: [SCHOLARSHIP] });
    }

    if (method === 'PATCH' && path.startsWith('/admin/scholarships/')) {
        return ok({ ...SCHOLARSHIP, ...payload });
    }

    if (method === 'GET' && path === '/programs/') {
        return ok({ items: [PROGRAM] });
    }

    if (method === 'GET' && path === '/courses/') {
        return ok({ items: [COURSE] });
    }

    if (method === 'POST' && path.includes('/auth/logout')) {
        return ok({});
    }

    console.warn(`[MOCK] unmatched path: ${method} ${path}`);
    return ok({});
}

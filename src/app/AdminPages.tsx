import { useEffect, useId, useState, type ReactNode } from 'react';
import { OnaekoAPI } from '@/api/base/config';
import storage from '@/services/storage';
import { academy } from '@/styles/academy-ui';
import {
    coursePayload,
    entityId,
    eventPayload,
    modulePayload,
    programPayload,
    rowsOf,
    type CourseForm,
    type EventForm,
    type ModuleForm,
    type ProgramForm,
} from '@/utils/admin-payloads';

const accountsLogin = () => {
    const origin = import.meta.env.VITE_ACCOUNTS_URL || 'http://localhost:5401';
    window.location.assign(
        `${origin}/login?next=${encodeURIComponent(window.location.href)}`,
    );
};

const requireAdminSession = (): boolean => {
    if (storage.checkToken()) {
        return true;
    }
    accountsLogin();
    return false;
};

const Field = ({
    label,
    value,
    onChange,
    type = 'text',
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    type?: string;
}) => (
    <label className="block space-y-1">
        <span className="text-sm text-[#615d59]">{label}</span>
        <input
            type={type}
            className={academy.input}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </label>
);

const SelectField = ({
    label,
    value,
    onChange,
    options,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    options: Array<{ value: string; label: string }>;
}) => (
    <label className="block space-y-1">
        <span className="text-sm text-[#615d59]">{label}</span>
        <select
            className={academy.select}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    </label>
);

const FormModal = ({
    open,
    title,
    onClose,
    children,
}: {
    open: boolean;
    title: string;
    onClose: () => void;
    children: ReactNode;
}) => {
    const titleId = useId();
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
            <button
                type="button"
                className={`absolute inset-0 ${academy.overlay}`}
                aria-label="Close dialog"
                onClick={onClose}
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className={`relative z-10 flex max-h-[min(90vh,720px)] w-full max-w-lg flex-col ${academy.modal}`}
            >
                <div className="flex items-center justify-between border-b border-[#e6e6e6] px-4 py-3">
                    <h2 id={titleId} className="text-lg font-semibold text-[#000000]">
                        {title}
                    </h2>
                    <button
                        type="button"
                        className="min-h-11 min-w-11 rounded-lg text-[#615d59] hover:bg-[#f6f5f4]"
                        aria-label="Close"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
                <div className="overflow-y-auto px-4 py-4">{children}</div>
            </div>
        </div>
    );
};

const isoToLocal = (value?: string) => {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const localToIso = (value: string) => {
    if (!value) return new Date().toISOString();
    const normalized = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)
        ? `${value}:00`
        : value;
    const date = new Date(normalized);
    return Number.isNaN(date.getTime())
        ? new Date().toISOString().replace(/\.\d{3}Z$/, 'Z')
        : date.toISOString().replace(/\.\d{3}Z$/, 'Z');
};

const resultMessage = (res: { message?: string; errors?: unknown }) => {
    const extra = Array.isArray(res.errors)
        ? res.errors.filter(Boolean).join('; ')
        : '';
    return extra
        ? `${res.message || 'Request failed'} — ${extra}`
        : res.message || '';
};

const defaultProgram = (): ProgramForm => ({
    title: 'AI Education',
    slug: 'ai-education',
    description: 'Editorial programme',
    hostName: 'Onaeko',
    partnerName: 'Greylight Ventures',
    outcomes: 'Learn AI teaching practice, Build classroom workflows',
    whoFor: 'Educators',
    whoNotFor: 'Spectators',
    tags: 'AI, Education',
    facultyName: 'Casey Winters',
    facultyTitle: 'Faculty',
    status: 'published',
});

const defaultCourse = (): CourseForm => ({
    title: 'Growth Engineering',
    slug: 'growth-engineering',
    description: 'Editorial course',
    price: '642000',
    scholarshipPrice: '65000',
    shopUrl: 'https://paystack.com/pay/growth',
    hostName: 'Onaeko',
    status: 'published',
    scholarshipEnabled: true,
});

const defaultEvent = (): EventForm => ({
    title: 'Engineering Leadership',
    description: 'Admin-created session',
    scheduledAt: isoToLocal(new Date(Date.now() + 86400000).toISOString()),
    endsAt: isoToLocal(new Date(Date.now() + 90000000).toISOString()),
    hostName: 'Damola Oladipo',
    meetingUrl: 'https://zoom.us/j/admin',
    recordingUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    timezone: 'Africa/Lagos',
    venue: 'Zoom',
});

const defaultModule = (order: number): ModuleForm => ({
    title: 'Module 01',
    description: 'Admin module',
    order,
    startsAt: isoToLocal(new Date(Date.now() + 86400000).toISOString()),
    endsAt: isoToLocal(new Date(Date.now() + 90000000).toISOString()),
    instructorName: 'Damola Oladipo',
    meetingUrl: 'https://zoom.us/j/module',
    recordingUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
});

const STATUS_OPTIONS = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
];

const YES_NO = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
];

export function ProgramsAdmin() {
    const [rows, setRows] = useState<Array<Record<string, unknown>>>([]);
    const [form, setForm] = useState<ProgramForm>(defaultProgram);
    const [message, setMessage] = useState('');
    const [selected, setSelected] = useState('');
    const [editingId, setEditingId] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const setField = <K extends keyof ProgramForm>(
        key: K,
        value: ProgramForm[K],
    ) => setForm((current) => ({ ...current, [key]: value }));

    const load = async () => {
        const res = await OnaekoAPI.catalogue.listPrograms();
        setRows(rowsOf(res.data));
        if (res.error) setMessage(res.message);
    };

    useEffect(() => {
        if (!requireAdminSession()) return;
        void load();
    }, []);

    const openCreate = () => {
        setEditingId('');
        setForm(defaultProgram());
        setModalOpen(true);
    };

    const openEdit = (row: Record<string, unknown>) => {
        const id = entityId(row);
        setSelected(id);
        setEditingId(id);
        setForm({
            title: String(row.title || ''),
            slug: String(row.slug || ''),
            description: String(row.description || ''),
            hostName: String(row.hostName || ''),
            partnerName: String(row.partnerName || ''),
            outcomes: Array.isArray(row.outcomes) ? row.outcomes.join(', ') : '',
            whoFor: Array.isArray(row.whoFor) ? row.whoFor.join(', ') : '',
            whoNotFor: Array.isArray(row.whoNotFor)
                ? row.whoNotFor.join(', ')
                : '',
            tags: Array.isArray(row.tags) ? row.tags.join(', ') : '',
            facultyName: String(
                (row.faculty as Array<{ name?: string }>)?.[0]?.name || '',
            ),
            facultyTitle: String(
                (row.faculty as Array<{ title?: string }>)?.[0]?.title || '',
            ),
            status: row.status === 'draft' ? 'draft' : 'published',
        });
        setModalOpen(true);
    };

    return (
        <div className="mx-auto max-w-3xl space-y-6 text-[#000000]">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-semibold">Programs</h1>
                <button
                    type="button"
                    className={`min-h-11 rounded-full px-5 text-sm font-medium ${academy.cta}`}
                    onClick={openCreate}
                >
                    New program
                </button>
            </div>
            {message && <p className="text-sm text-[#615d59]">{message}</p>}
            <ul className="space-y-2">
                {rows.map((row) => {
                    const id = entityId(row);
                    return (
                        <li key={id || String(row.slug)}>
                            <button
                                type="button"
                                className={`w-full min-h-11 ${academy.card} p-4 text-left hover:border-[#a39e98]`}
                                onClick={() => openEdit(row)}
                            >
                                {String(row.title)} ({String(row.slug)})
                            </button>
                        </li>
                    );
                })}
            </ul>
            {selected && <EventsAdmin programId={selected} />}

            <FormModal
                open={modalOpen}
                title={editingId ? 'Edit program' : 'New program'}
                onClose={() => setModalOpen(false)}
            >
                <form
                    className="space-y-3"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const payload = programPayload(form);
                        const saved = editingId
                            ? await OnaekoAPI.catalogue.updateProgram(
                                  editingId,
                                  payload,
                              )
                            : await OnaekoAPI.catalogue.createProgram(payload);
                        setMessage(resultMessage(saved));
                        const id =
                            entityId(saved.data as Record<string, unknown>) ||
                            editingId;
                        if (!saved.error && id) {
                            if (form.status === 'published') {
                                await OnaekoAPI.catalogue.updateProgram(id, {
                                    status: 'published',
                                });
                            }
                            setSelected(id);
                            setEditingId(id);
                            setModalOpen(false);
                        }
                        await load();
                    }}
                >
                    <Field
                        label="Title"
                        value={form.title}
                        onChange={(v) => setField('title', v)}
                    />
                    <Field
                        label="Slug"
                        value={form.slug}
                        onChange={(v) => setField('slug', v)}
                    />
                    <Field
                        label="Description"
                        value={form.description}
                        onChange={(v) => setField('description', v)}
                    />
                    <Field
                        label="Host name"
                        value={form.hostName}
                        onChange={(v) => setField('hostName', v)}
                    />
                    <Field
                        label="Partner name"
                        value={form.partnerName}
                        onChange={(v) => setField('partnerName', v)}
                    />
                    <Field
                        label="Outcomes (comma separated)"
                        value={form.outcomes}
                        onChange={(v) => setField('outcomes', v)}
                    />
                    <Field
                        label="Who this is for"
                        value={form.whoFor}
                        onChange={(v) => setField('whoFor', v)}
                    />
                    <Field
                        label="Who this is not for"
                        value={form.whoNotFor}
                        onChange={(v) => setField('whoNotFor', v)}
                    />
                    <Field
                        label="Tags"
                        value={form.tags}
                        onChange={(v) => setField('tags', v)}
                    />
                    <Field
                        label="Faculty name"
                        value={form.facultyName}
                        onChange={(v) => setField('facultyName', v)}
                    />
                    <Field
                        label="Faculty title"
                        value={form.facultyTitle}
                        onChange={(v) => setField('facultyTitle', v)}
                    />
                    <SelectField
                        label="Status"
                        value={form.status}
                        onChange={(v) =>
                            setField('status', v as ProgramForm['status'])
                        }
                        options={STATUS_OPTIONS}
                    />
                    <button
                        type="submit"
                        className={`min-h-11 w-full rounded-full px-5 text-sm font-medium ${academy.cta}`}
                    >
                        {editingId ? 'Save program' : 'Create and publish'}
                    </button>
                </form>
            </FormModal>
        </div>
    );
}

export function EventsAdmin({ programId }: { programId: string }) {
    const [rows, setRows] = useState<Array<Record<string, unknown>>>([]);
    const [form, setForm] = useState<EventForm>(defaultEvent);
    const [editingId, setEditingId] = useState('');
    const [message, setMessage] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const setField = <K extends keyof EventForm>(key: K, value: EventForm[K]) =>
        setForm((current) => ({ ...current, [key]: value }));

    const load = async () => {
        const res = await OnaekoAPI.catalogue.listEvents(programId);
        setRows(rowsOf(res.data));
        if (res.error) setMessage(res.message);
    };

    useEffect(() => {
        void load();
    }, [programId]);

    return (
        <section className="space-y-3 border-t border-[#e6e6e6] pt-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-semibold">Events</h2>
                <button
                    type="button"
                    className={`min-h-11 rounded-full px-5 text-sm font-medium ${academy.cta}`}
                    onClick={() => {
                        setEditingId('');
                        setForm(defaultEvent());
                        setModalOpen(true);
                    }}
                >
                    New event
                </button>
            </div>
            {message && <p className="text-sm text-[#615d59]">{message}</p>}
            <ul className="space-y-2">
                {rows.map((row) => {
                    const id = entityId(row);
                    return (
                        <li key={id}>
                            <button
                                type="button"
                                className={`w-full ${academy.card} p-3 text-left`}
                                onClick={() => {
                                    setEditingId(id);
                                    setForm({
                                        title: String(row.title || ''),
                                        description: String(row.description || ''),
                                        scheduledAt: isoToLocal(
                                            String(row.scheduledAt || ''),
                                        ),
                                        endsAt: isoToLocal(String(row.endsAt || '')),
                                        hostName: String(row.hostName || ''),
                                        meetingUrl: String(row.meetingUrl || ''),
                                        recordingUrl: String(
                                            (row.recording as { url?: string })?.url ||
                                                row.recordingUrl ||
                                                '',
                                        ),
                                        timezone: String(row.timezone || 'Africa/Lagos'),
                                        venue: String(row.venue || ''),
                                    });
                                    setModalOpen(true);
                                }}
                            >
                                {String(row.title)}
                            </button>
                        </li>
                    );
                })}
            </ul>

            <FormModal
                open={modalOpen}
                title={editingId ? 'Edit event' : 'New event'}
                onClose={() => setModalOpen(false)}
            >
                <form
                    className="space-y-3"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const payload = eventPayload({
                            ...form,
                            scheduledAt: localToIso(form.scheduledAt),
                            endsAt: localToIso(form.endsAt),
                        });
                        const saved = editingId
                            ? await OnaekoAPI.catalogue.updateEvent(
                                  programId,
                                  editingId,
                                  payload,
                              )
                            : await OnaekoAPI.catalogue.createEvent(
                                  programId,
                                  payload,
                              );
                        setMessage(resultMessage(saved));
                        if (!saved.error) {
                            setEditingId(
                                entityId(saved.data as Record<string, unknown>) ||
                                    editingId,
                            );
                            setModalOpen(false);
                        }
                        await load();
                    }}
                >
                    <Field
                        label="Title"
                        value={form.title}
                        onChange={(v) => setField('title', v)}
                    />
                    <Field
                        label="Description"
                        value={form.description}
                        onChange={(v) => setField('description', v)}
                    />
                    <Field
                        label="Starts"
                        type="datetime-local"
                        value={form.scheduledAt}
                        onChange={(v) => setField('scheduledAt', v)}
                    />
                    <Field
                        label="Ends"
                        type="datetime-local"
                        value={form.endsAt}
                        onChange={(v) => setField('endsAt', v)}
                    />
                    <Field
                        label="Host"
                        value={form.hostName}
                        onChange={(v) => setField('hostName', v)}
                    />
                    <Field
                        label="Zoom URL"
                        value={form.meetingUrl}
                        onChange={(v) => setField('meetingUrl', v)}
                    />
                    <Field
                        label="Recording URL"
                        value={form.recordingUrl}
                        onChange={(v) => setField('recordingUrl', v)}
                    />
                    <SelectField
                        label="Timezone"
                        value={form.timezone}
                        onChange={(v) => setField('timezone', v)}
                        options={[
                            { value: 'Africa/Lagos', label: 'Africa/Lagos' },
                            { value: 'UTC', label: 'UTC' },
                            { value: 'America/New_York', label: 'America/New_York' },
                        ]}
                    />
                    <Field
                        label="Venue"
                        value={form.venue}
                        onChange={(v) => setField('venue', v)}
                    />
                    <button
                        type="submit"
                        className={`min-h-11 w-full rounded-full px-5 text-sm font-medium ${academy.cta}`}
                    >
                        {editingId ? 'Save event' : 'Create event'}
                    </button>
                </form>
            </FormModal>
        </section>
    );
}

export function CoursesAdmin() {
    const [rows, setRows] = useState<Array<Record<string, unknown>>>([]);
    const [form, setForm] = useState<CourseForm>(defaultCourse);
    const [selected, setSelected] = useState('');
    const [editingId, setEditingId] = useState('');
    const [message, setMessage] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const setField = <K extends keyof CourseForm>(
        key: K,
        value: CourseForm[K],
    ) => setForm((current) => ({ ...current, [key]: value }));

    const load = async () => {
        const res = await OnaekoAPI.catalogue.listCourses();
        setRows(rowsOf(res.data));
        if (res.error) setMessage(res.message);
    };

    useEffect(() => {
        if (!requireAdminSession()) return;
        void load();
    }, []);

    const openEdit = (row: Record<string, unknown>) => {
        const id = entityId(row);
        setSelected(id);
        setEditingId(id);
        setForm({
            title: String(row.title || ''),
            slug: String(row.slug || ''),
            description: String(row.description || ''),
            price: String(
                typeof row.price === 'number' ? row.price / 100 : row.price || '',
            ),
            scholarshipPrice: String(
                typeof row.scholarshipPrice === 'number'
                    ? row.scholarshipPrice / 100
                    : row.scholarshipPrice || '',
            ),
            shopUrl: String(
                (row.payment as { shopUrl?: string })?.shopUrl || '',
            ),
            hostName: String(row.hostName || ''),
            status: row.status === 'draft' ? 'draft' : 'published',
            scholarshipEnabled: Boolean(row.scholarshipEnabled),
        });
        setModalOpen(true);
    };

    return (
        <div className="mx-auto max-w-3xl space-y-6 text-[#000000]">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-semibold">Courses</h1>
                <button
                    type="button"
                    className={`min-h-11 rounded-full px-5 text-sm font-medium ${academy.cta}`}
                    onClick={() => {
                        setEditingId('');
                        setForm(defaultCourse());
                        setModalOpen(true);
                    }}
                >
                    New course
                </button>
            </div>
            {message && <p className="text-sm text-[#615d59]">{message}</p>}
            <ul className="space-y-2">
                {rows.map((row) => {
                    const id = entityId(row);
                    return (
                        <li key={id || String(row.slug)}>
                            <button
                                type="button"
                                className={`w-full ${academy.card} p-4 text-left`}
                                onClick={() => openEdit(row)}
                            >
                                {String(row.title)}
                            </button>
                        </li>
                    );
                })}
            </ul>
            {selected && <ModulesAdmin courseId={selected} />}

            <FormModal
                open={modalOpen}
                title={editingId ? 'Edit course' : 'New course'}
                onClose={() => setModalOpen(false)}
            >
                <form
                    className="space-y-3"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const payload = coursePayload(form);
                        const saved = editingId
                            ? await OnaekoAPI.catalogue.updateCourse(
                                  editingId,
                                  payload,
                              )
                            : await OnaekoAPI.catalogue.createCourse(payload);
                        setMessage(resultMessage(saved));
                        const id =
                            entityId(saved.data as Record<string, unknown>) ||
                            editingId;
                        if (!saved.error && id) {
                            if (form.status === 'published') {
                                await OnaekoAPI.catalogue.updateCourse(id, {
                                    status: 'published',
                                });
                            }
                            setSelected(id);
                            setEditingId(id);
                            setModalOpen(false);
                        }
                        await load();
                    }}
                >
                    <Field
                        label="Title"
                        value={form.title}
                        onChange={(v) => setField('title', v)}
                    />
                    <Field
                        label="Slug"
                        value={form.slug}
                        onChange={(v) => setField('slug', v)}
                    />
                    <Field
                        label="Description"
                        value={form.description}
                        onChange={(v) => setField('description', v)}
                    />
                    <Field
                        label="Price (major units)"
                        value={form.price}
                        onChange={(v) => setField('price', v)}
                    />
                    <Field
                        label="Scholarship price (major units)"
                        value={form.scholarshipPrice}
                        onChange={(v) => setField('scholarshipPrice', v)}
                    />
                    <Field
                        label="Paystack shop URL"
                        value={form.shopUrl}
                        onChange={(v) => setField('shopUrl', v)}
                    />
                    <Field
                        label="Host name"
                        value={form.hostName}
                        onChange={(v) => setField('hostName', v)}
                    />
                    <SelectField
                        label="Scholarship enabled"
                        value={form.scholarshipEnabled ? 'yes' : 'no'}
                        onChange={(v) => setField('scholarshipEnabled', v === 'yes')}
                        options={YES_NO}
                    />
                    <SelectField
                        label="Status"
                        value={form.status}
                        onChange={(v) =>
                            setField('status', v as CourseForm['status'])
                        }
                        options={STATUS_OPTIONS}
                    />
                    <button
                        type="submit"
                        className={`min-h-11 w-full rounded-full px-5 text-sm font-medium ${academy.cta}`}
                    >
                        {editingId ? 'Save course' : 'Create and publish'}
                    </button>
                </form>
            </FormModal>
        </div>
    );
}

export function ModulesAdmin({ courseId }: { courseId: string }) {
    const [rows, setRows] = useState<Array<Record<string, unknown>>>([]);
    const [form, setForm] = useState<ModuleForm>(defaultModule(1));
    const [editingId, setEditingId] = useState('');
    const [message, setMessage] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const setField = <K extends keyof ModuleForm>(
        key: K,
        value: ModuleForm[K],
    ) => setForm((current) => ({ ...current, [key]: value }));

    const load = async () => {
        const res = await OnaekoAPI.catalogue.listModules(courseId);
        setRows(rowsOf(res.data));
        if (res.error) setMessage(res.message);
    };

    useEffect(() => {
        void load();
    }, [courseId]);

    return (
        <section className="space-y-3 border-t border-[#e6e6e6] pt-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-semibold">Modules</h2>
                <button
                    type="button"
                    className={`min-h-11 rounded-full px-5 text-sm font-medium ${academy.cta}`}
                    onClick={() => {
                        setEditingId('');
                        setForm(defaultModule(rows.length + 1));
                        setModalOpen(true);
                    }}
                >
                    New module
                </button>
            </div>
            {message && <p className="text-sm text-[#615d59]">{message}</p>}
            <ul className="space-y-2">
                {rows.map((row) => {
                    const id = entityId(row);
                    return (
                        <li key={id}>
                            <button
                                type="button"
                                className={`w-full ${academy.card} p-3 text-left`}
                                onClick={() => {
                                    setEditingId(id);
                                    const recording = row.recording as
                                        | { url?: string }
                                        | undefined;
                                    setForm({
                                        title: String(row.title || ''),
                                        description: String(row.description || ''),
                                        order: Number(row.order || 1),
                                        startsAt: isoToLocal(
                                            String(row.startsAt || ''),
                                        ),
                                        endsAt: isoToLocal(String(row.endsAt || '')),
                                        instructorName: String(
                                            (row.instructor as { name?: string })
                                                ?.name || '',
                                        ),
                                        meetingUrl: String(row.meetingUrl || ''),
                                        recordingUrl: String(recording?.url || ''),
                                    });
                                    setModalOpen(true);
                                }}
                            >
                                {String(row.title)}
                            </button>
                        </li>
                    );
                })}
            </ul>

            <FormModal
                open={modalOpen}
                title={editingId ? 'Edit module' : 'New module'}
                onClose={() => setModalOpen(false)}
            >
                <form
                    className="space-y-3"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const payload = modulePayload({
                            ...form,
                            order: form.order || rows.length + 1,
                            startsAt: localToIso(form.startsAt),
                            endsAt: localToIso(form.endsAt),
                        });
                        const saved = editingId
                            ? await OnaekoAPI.catalogue.updateModule(
                                  courseId,
                                  editingId,
                                  payload,
                              )
                            : await OnaekoAPI.catalogue.createModule(
                                  courseId,
                                  payload,
                              );
                        setMessage(resultMessage(saved));
                        if (!saved.error) {
                            setEditingId(
                                entityId(saved.data as Record<string, unknown>) ||
                                    editingId,
                            );
                            setModalOpen(false);
                        }
                        await load();
                    }}
                >
                    <Field
                        label="Title"
                        value={form.title}
                        onChange={(v) => setField('title', v)}
                    />
                    <Field
                        label="Zoom URL"
                        value={form.meetingUrl}
                        onChange={(v) => setField('meetingUrl', v)}
                    />
                    <Field
                        label="Recording URL"
                        value={form.recordingUrl}
                        onChange={(v) => setField('recordingUrl', v)}
                    />
                    <button
                        type="submit"
                        className={`min-h-11 w-full rounded-full px-5 text-sm font-medium ${academy.cta}`}
                    >
                        {editingId ? 'Save module' : 'Create module'}
                    </button>
                </form>
            </FormModal>
        </section>
    );
}

export function ScholarshipsAdmin() {
    const [rows, setRows] = useState<Array<Record<string, unknown>>>([]);
    const [message, setMessage] = useState('');
    const [active, setActive] = useState<Record<string, unknown> | null>(null);
    const [decision, setDecision] = useState<'approved' | 'rejected'>('approved');

    const load = async () => {
        if (!requireAdminSession()) return;
        const res = await OnaekoAPI.catalogue.listScholarships();
        setRows(rowsOf(res.data));
        if (res.error) setMessage(res.message);
    };

    useEffect(() => {
        void load();
    }, []);

    return (
        <div className="mx-auto max-w-3xl space-y-4 text-[#000000]">
            <h1 className="text-2xl font-semibold">Scholarships</h1>
            {message && <p className="text-sm text-[#615d59]">{message}</p>}
            <ul className="space-y-3">
                {rows.map((row) => {
                    const id = entityId(row);
                    return (
                        <li key={id}>
                            <button
                                type="button"
                                className={`flex w-full flex-wrap items-center gap-3 ${academy.card} p-4 text-left`}
                                onClick={() => {
                                    setActive(row);
                                    setDecision(
                                        row.status === 'rejected'
                                            ? 'rejected'
                                            : 'approved',
                                    );
                                }}
                            >
                                <span className="flex-1">
                                    {String(
                                        row.courseTitle ||
                                            row.courseSlug ||
                                            row.slug ||
                                            id,
                                    )}{' '}
                                    — {String(row.status)}
                                </span>
                                <span className="text-sm text-[#f36827]">Review</span>
                            </button>
                        </li>
                    );
                })}
            </ul>
            {rows.length === 0 && (
                <p className="text-[#615d59]">No applications.</p>
            )}

            <FormModal
                open={Boolean(active)}
                title="Review scholarship"
                onClose={() => setActive(null)}
            >
                <form
                    className="space-y-3"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        if (!active) return;
                        const id = entityId(active);
                        const res = await OnaekoAPI.catalogue.patchScholarship(
                            id,
                            decision,
                        );
                        setMessage(resultMessage(res));
                        if (!res.error) setActive(null);
                        await load();
                    }}
                >
                    <p className="text-sm text-[#615d59]">
                        {String(
                            active?.courseTitle ||
                                active?.courseSlug ||
                                active?.slug ||
                                '',
                        )}
                    </p>
                    <SelectField
                        label="Decision"
                        value={decision}
                        onChange={(v) =>
                            setDecision(v as 'approved' | 'rejected')
                        }
                        options={[
                            { value: 'approved', label: 'Approve' },
                            { value: 'rejected', label: 'Reject' },
                        ]}
                    />
                    <button
                        type="submit"
                        className={`min-h-11 w-full rounded-full px-5 text-sm font-medium ${academy.cta}`}
                    >
                        Save decision
                    </button>
                </form>
            </FormModal>
        </div>
    );
}

export function AdminHome() {
    return (
        <div className="space-y-3 text-[#000000]">
            <h1 className="text-2xl font-semibold">Admin</h1>
            <p className="text-[#615d59]">
                Author programmes, courses, events, modules, and scholarships.
            </p>
        </div>
    );
}

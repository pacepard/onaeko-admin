import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
    Award,
    BookOpen,
    GraduationCap,
    Home,
    Menu,
    X,
} from 'lucide-react';
import type { IRoute } from '@/utils/interfaces.util';
import {
    AdminHome,
    CoursesAdmin,
    ProgramsAdmin,
    ScholarshipsAdmin,
} from '@/app/AdminPages';
import { academy } from '@/styles/academy-ui';
import { OnaekoIcon, OnaekoLogo } from '@/components/brand/OnaekoBrand';

const AdminShell = () => {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const links = [
        { to: '/', label: 'Home', icon: Home },
        { to: '/programs', label: 'Programs', icon: GraduationCap },
        { to: '/courses', label: 'Courses', icon: BookOpen },
        { to: '/scholarships', label: 'Scholarships', icon: Award },
    ];

    const isActive = (to: string) =>
        to === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(to);

    return (
        <div
            className={`flex min-h-screen min-w-0 overflow-hidden ${academy.canvas} font-sans ${academy.ink}`}
        >
            {open && (
                <button
                    type="button"
                    className={`fixed inset-0 z-20 lg:hidden ${academy.overlay}`}
                    aria-label="Close menu overlay"
                    onClick={() => setOpen(false)}
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r ${academy.border} ${academy.sidebar} transition-transform lg:static lg:translate-x-0 ${
                    open ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex items-center gap-2 px-4 py-5">
                    <OnaekoIcon width={28} height={28} />
                    <div className="min-w-0">
                        <OnaekoLogo width={120} height={26} />
                        <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#a39e98]">
                            Admin
                        </p>
                    </div>
                </div>

                <div className="px-3 pb-2">
                    <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#a39e98]">
                        Catalogue
                    </p>
                    <div className={`mb-2 border-b ${academy.border}`} />
                    <nav className="flex flex-col gap-0.5" aria-label="Main">
                        {links.map((link) => {
                            const Icon = link.icon;
                            const active = isActive(link.to);
                            return (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    data-active={active}
                                    onClick={() => setOpen(false)}
                                    className={`flex h-11 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors ${
                                        active
                                            ? academy.navActive
                                            : academy.navIdle
                                    }`}
                                >
                                    <Icon
                                        className={`h-5 w-5 shrink-0 ${
                                            active
                                                ? academy.iconActive
                                                : academy.iconIdle
                                        }`}
                                        aria-hidden
                                    />
                                    <span>{link.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">
                <header
                    className={`sticky top-0 z-20 flex h-14 items-center gap-2 border-b ${academy.border} ${academy.shell} px-4`}
                >
                    <button
                        type="button"
                        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-[#31302e] hover:bg-[#f6f5f4] lg:hidden"
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        onClick={() => setOpen((v) => !v)}
                    >
                        {open ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>
                    <p className="text-sm font-medium text-[#615d59]">
                        Catalogue authoring
                    </p>
                </header>
                <main className="flex-1 overflow-auto px-4 py-6 lg:px-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

const adminRoutes: Array<IRoute> = [
    {
        name: 'admin-shell',
        path: '/',
        element: <AdminShell />,
        children: [
            { name: 'home', index: true, element: <AdminHome /> },
            { name: 'programs', path: 'programs', element: <ProgramsAdmin /> },
            { name: 'courses', path: 'courses', element: <CoursesAdmin /> },
            {
                name: 'scholarships',
                path: 'scholarships',
                element: <ScholarshipsAdmin />,
            },
        ],
    },
];

export default adminRoutes;

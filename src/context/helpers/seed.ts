import type {
    ICollection,
    ICoreResource,
    IHackDomain,
    IProjectDomain,
    ISidebarProps,
    IToast,
} from './interface';
import type { IPagination } from '@/utils/interfaces.util';
import sidebarRoutes from '@/routes/sidebar.route';

const pagination: IPagination = {
    next: { page: 1, limit: 25 },
    prev: { page: 1, limit: 25 },
};

export const collection: ICollection = {
    data: [],
    count: 0,
    total: 0,
    pagination,
    loading: false,
    message: 'There are no data currently',
};

export const sidebar: ISidebarProps = {
    collapsed: false,
    route: sidebarRoutes[0]!,
    isOpen: false,
    subroutes: [],
    inroutes: [],
};

export const toast: IToast = {
    type: 'success',
    show: false,
    message: '',
    title: 'Feedback',
    position: 'top-right',
    close: () => {},
};

export const coreResoruce: ICoreResource = {
    forms: [],
    blocks: [],
    questions: [],
    responses: [],
};

export const hackResource: IHackDomain = {
    hackathons: [],
    entries: [],
    submissions: [],
    squad: [],
};

export const projectResource: IProjectDomain = {
    projects: [],
    Teams: [],
    tasks: [],
};

export { pagination };

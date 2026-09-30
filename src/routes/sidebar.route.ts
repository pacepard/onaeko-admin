import type { IRouteItem } from '@/context/helpers/interface';
import { RouteURL } from './paths';

const sidebarRoutes: Array<IRouteItem> = [
    {
        name: 'admin',
        path: RouteURL.admin,
        title: 'Home',
        subroutes: [],
        inroutes: [],
    },
];
export default sidebarRoutes;

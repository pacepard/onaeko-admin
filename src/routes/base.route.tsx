import type { IRoute } from '@/utils/interfaces.util';
import { RouteURL } from './paths';
import ErrorPage from '@/app/Error';

const baseRoutes: Array<IRoute> = [
    {
        name: 'home',
        path: RouteURL.home,
        redirect: RouteURL.onboarding,
    },
    {
        name: 'error',
        path: '*',
        element: <ErrorPage />,
    },
];

export default baseRoutes;

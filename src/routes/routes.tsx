import { Route, Routes } from 'react-router-dom';
import type { IRoute } from '@/utils/interfaces.util';
import adminRoutes from './admin.route';
import ErrorPage from '@/app/Error';

function renderRoutes(routes: Array<IRoute>) {
    return routes.map((route) => {
        if (route.index) {
            return <Route key={route.name} index element={route.element} />;
        }
        return (
            <Route key={route.name} path={route.path} element={route.element}>
                {route.children ? renderRoutes(route.children) : null}
            </Route>
        );
    });
}

function MainRoutes() {
    return (
        <Routes>
            {renderRoutes(adminRoutes)}
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}

export default MainRoutes;

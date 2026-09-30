import { BrowserRouter as Router } from 'react-router-dom';

import '@/styles/globals.css';
import { initTheme } from '@onaeko/ui';
import UserState from './context/user/userState';
import AppState from './context/app/appState';
import MainRoutes from './routes/routes';

initTheme('light');

function App() {
    return (
        <Router>
            <UserState>
                <AppState>
                    <MainRoutes />
                </AppState>
            </UserState>
        </Router>
    );
}

export default App;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useHistory, useLocation, useParams } from 'react-router-dom';
import store from '../store';

export function uuid(): number {
    return Math.floor(Math.random() * (600 - 200 + 1)) + 500;
}

export const useUrl = (): any => {
    const history = useHistory();
    const goBack = (): void => history.goBack();
    const navigate = (route: string): void => {
        history.push(route);
    };
    return { goBack, navigate };
};

export const usePath = (): any => {
    const history = useHistory();
    const location = useLocation();
    const { pathname } = useLocation();
    const params = useParams();

    const isActive = (path: string): boolean => {
        return location.pathname === path;
    };
    return { location, isActive, pathname, history, params };
};

export const useLogout = (): void => {
    localStorage.removeItem('isAuth');
    localStorage.removeItem('representative');
    localStorage.removeItem('operator');
    store.dispatch({ type: 'LOGOUT' });
    window.location.href = '/login';
};

export const uuid10 = (): string => {
    const random = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    return random.toString();
};

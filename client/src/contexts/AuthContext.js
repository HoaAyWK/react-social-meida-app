import React, { useContext, useEffect, useReducer } from 'react';

import AuthReducer from './AuthReducer';
import useLocalStorage from '../hooks/useLocalStorage';

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isFetching: false,
    error: false
};

const AuthContext = React.createContext(INITIAL_STATE);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    const [user, setUser] = useLocalStorage('user', null);

    useEffect(() => {
        setUser(state.user);
    }, [state.user, setUser]);

    const value = {
        user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch
    };

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    );
}
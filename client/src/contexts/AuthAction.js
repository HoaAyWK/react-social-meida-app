import ACTIONS from '../constFile';

export const LoginStart = (userCredentials) => ({
    type: ACTIONS.LOGIN_START
});

export const LoginSuccess = (user) => ({
    type: ACTIONS.LOGIN_SUCCESS
});

export const LoginFailure = () => ({
    type: ACTIONS.LOGIN_FAILURE
});


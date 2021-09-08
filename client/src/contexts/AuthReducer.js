import ACTIONS from '../constFile';

const AuthReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN_START:
            return {
                user: null,
                isFetching: true,
                error: false
            };
        case ACTIONS.LOGIN_SUCCESS:
            return {
                user: action.payload,
                isFetching: false,
                error: false
            };
        case ACTIONS.LOGIN_FAILURE:
            return {
                user: null,
                isFetching: false,
                error: true 
            };
        default: 
            return state;
    }
}

export default AuthReducer;
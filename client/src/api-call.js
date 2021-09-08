import axios from 'axios';

import ACTIONS from './constFile';

export const LoginCall = async (userCredential, dispatch) => {
    dispatch({type: ACTIONS.LOGIN_START});
    try {
        const res = await axios.post('http://localhost:5000/api/signin', userCredential);
        dispatch({type: ACTIONS.LOGIN_SUCCESS, payload: res.data});
    } catch(err) {
        dispatch({type: ACTIONS.LOGIN_FAILURE, padload: err});
    }
}
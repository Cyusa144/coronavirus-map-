import axios from 'axios';
import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT } from './actionTypes';

export const authStart = () => {
    return {
        type: AUTH_START
    };
};

export const authSuccess = (token, userInfo) => {
    return {
        type: AUTH_SUCCESS,
        idToken: token,
        userInfo
    };
};

export const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    return {
        type: AUTH_LOGOUT
    };
};

export const auth = (data, replace, isSignup) => dispatch => {
    dispatch(authStart());
    let url = 'http://localhost:4000/api/users/signup';
    if (!isSignup) {
    url = 'http://localhost:4000/api/users/login';
    }
    axios.post(url, data)
        .then(response => {
            const {data: userInfo } = response.data;
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            dispatch(authSuccess(response.data.token, JSON.stringify(userInfo)));
            replace('/news');
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail(err));
        });
};

export const authCheckState = () => dispatch => {
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('userInfo');
    if (!token) {
        dispatch(logout());
        return false;
    } else {
        dispatch(authSuccess(token, userInfo));
        return true;
    }    
};
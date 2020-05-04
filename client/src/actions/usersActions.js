import { ADD_USER, GET_USER, LOGIN, LOGOUT } from "./actionTypes";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Action creator
const getUser = user => {
    return {
        type: GET_USER,
        payload: user
    };
};

const addUser = user => {
    return {
        type: ADD_USER,
        payload: user
    };
};

const login = user => {
    return {
        type: LOGIN,
        payload: user
    };
};

const logout = () => {
    return {
        type: LOGOUT
    };
};

// Thunks
export const getUserThunk = userId => async dispatch => {
    try {
        const res = await axios.get(`${BASE_URL}/api/users/${userId}`);
        dispatch(getUser(res.data));
    } catch (err) {
        console.log(err);
    }
};

export const addUserThunk = (name, email, password) => async dispatch => {
    try {
        const body = {
            name: name,
            email: email,
            password: password
        };
        const newUser = await axios.post(`${BASE_URL}/api/auth/signup`, body, {
            withCredentials: true
        });
        dispatch(addUser(newUser.data));
    } catch (err) {
        console.log(err);
    }
};

export const loginThunk = (email, password) => async dispatch => {
    try {
        const body = {
            email: email,
            password: password
        };
        const user = await axios.post(`${BASE_URL}/api/users/auth/login`, body, {
            withCredentials: true
        });
        dispatch(login(user.data));
    } catch (err) {
        console.log(err);
    }
};

export const logoutThunk = () => async dispatch => {
    try {
        await axios.delete(`${BASE_URL}/api/auth/logout`, {
            withCredentials: true
        });
        dispatch(logout());
    } catch (err) {
        console.log(err);
    }
};

export const me = () => async dispatch => {
    try {
        const res = await axios.get(`${BASE_URL}/api/auth/me`, {
            withCredentials: true
        });
        dispatch(login(res.data || {}));
    } catch (err) {
        console.error(err);
    }
};
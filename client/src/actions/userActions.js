import { GET_USER, LOGIN, LOGOUT } from "./actionTypes";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Action creator
const getUser = (user) => {
	return {
		type: GET_USER,
		payload: user,
	};
};

const login = (user) => {
	return {
		type: LOGIN,
		payload: user,
	};
};

const logout = () => {
	return {
		type: LOGOUT,
	};
};

// Thunks
export const getUserThunk = (userId) => async (dispatch) => {
	try {
		const res = await axios.get(`${BASE_URL}/api/users/${userId}`);
		dispatch(getUser(res.data));
	} catch (err) {
		console.log(err);
	}
};

export const addUserThunk = (
	email,
	password,
	first,
	last,
	dob,
	gender
) => async (dispatch) => {
	try {
		const body = {
			email,
			password,
			first,
			last,
			dob,
			gender,
		};
		await axios.post(`${BASE_URL}/api/users/auth/register`, body);

		// logs user in after signup
		const user = {
			email: body.email,
			password: body.password,
		};
		const response = await axios.post(`${BASE_URL}/api/users/auth/login`, user);
		const token = response.data.accessToken;
		localStorage.setItem("token", token);

		dispatch(login(body.email));
	} catch (err) {
		console.log(err);
	}
};

export const loginThunk = (email, password) => async (dispatch) => {
	try {
		const body = {
			email: email,
			password: password,
		};
		const response = await axios.post(`${BASE_URL}/api/users/auth/login`, body);
		const token = response.data.accessToken;
		localStorage.setItem("token", token);

		dispatch(login(body.email));
	} catch (err) {
		console.log(err);
	}
};

export const logoutThunk = () => async (dispatch) => {
	try {
		localStorage.removeItem("token");

		dispatch(logout());
	} catch (err) {
		console.log(err);
	}
};

export const me = () => async (dispatch) => {
	try {
		const headers = {
			authorization: localStorage.token,
		};
		const res = await axios.get(`${BASE_URL}/api/users/me`, { headers });
		const email = res.data.email;
		dispatch(login(email || {}));
	} catch (err) {
		console.error(err);
	}
};

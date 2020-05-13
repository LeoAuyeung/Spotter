import { GET_USERS, LOGIN, LOGOUT, GET_MY_PROFILE } from "./actionTypes";
import axios from "axios";

const BASE_URL = "";

// Action creator
const getUsers = (users) => {
	return {
		type: GET_USERS,
		payload: users,
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

const getMyProfile = (user) => {
	return {
		type: GET_MY_PROFILE,
		payload: user,
	};
};

// Thunks
export const getUsersThunk = () => async (dispatch) => {
	try {
		const headers = {
			authorization: localStorage.token,
		};
		const res = await axios.get(`${BASE_URL}/api/users`, { headers });

		dispatch(getUsers(res.data));
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

		const loggedInUser = {
			email: body.email,
		};

		dispatch(login(loggedInUser));
		// console.log(body)
	} catch (err) {
		console.log(err);
	}
};

export const loginThunk = (email, password) => async (dispatch) => {
	try {
		console.log(BASE_URL);

		const body = {
			email: email,
			password: password,
		};
		const response = await axios.post(`${BASE_URL}/api/users/auth/login`, body);
		const token = response.data.accessToken;
		localStorage.setItem("token", token);

		const loggedInUser = {
			email: body.email,
		};

		dispatch(login(loggedInUser));
		console.log(`${BASE_URL}/api/users/auth/login`);
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

		const loggedInUser = {
			email: res.data.email,
		};

		dispatch(login(loggedInUser || {}));
	} catch (err) {
		console.error(err);
	}
};

export const getMyProfileThunk = () => async (dispatch) => {
	try {
		const headers = {
			authorization: localStorage.token,
		};
		const res = await axios.get(`${BASE_URL}/api/users/profile`, { headers });

		const user = res.data;

		dispatch(getMyProfile(user));
	} catch (err) {
		console.log(err);
	}
};

// need backend for profile
export const getProfileThunk = () => async (dispatch) => {
	try {
		const headers = {
			authorization: localStorage.token,
		};
	}
};

// need backend function for edit bio
export const editProfileBioThunk = () => async (dispatch) => {
	try {
		const headers = {
			authorization: localStorage.token,
		};
	} catch (err) {
		console.log(err);
	}
};

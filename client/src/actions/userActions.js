import {
	GET_USERS,
	LOGIN,
	LOGOUT,
	GET_PROFILE,
	EDIT_BIO,
	CREATE_CONNECTION,
	GET_FAVORITES,
	ME,
} from "./actionTypes";
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

const getProfile = (user) => {
	return {
		type: GET_PROFILE,
		payload: user,
	};
};

const editProfileBio = (user) => {
	return {
		type: EDIT_BIO,
		payload: user,
	};
};

const connectWithUser = () => {
	return {
		type: CREATE_CONNECTION,
	};
};

const getFavorites = (users) => {
	return {
		type: GET_FAVORITES,
		payload: users,
	};
};

const mee = (data) => {
	return {
		type: ME,
		payload: data,
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

		const loggedInUser = {
			email: body.email,
		};

		dispatch(login(loggedInUser));
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

		const res2 = await axios.get(`${BASE_URL}/api/users/profile`, {
			headers,
		});

		const user = res2.data;

		dispatch(mee([loggedInUser || {}, user]));
		// dispatch(login(loggedInUser || {}));
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

		dispatch(getProfile(user));
	} catch (err) {
		console.log(err);
	}
};

// need backend for profile
export const getProfileThunk = (id) => async (dispatch) => {
	try {
		const headers = {
			authorization: localStorage.token,
		};

		const res = await axios.get(`${BASE_URL}/api/users/profile/${id}`, {
			headers: headers,
		});

		console.log(res.data);

		const user = res.data;

		dispatch(getProfile(user));
	} catch (err) {
		console.log(err);
	}
};

export const editProfileBioThunk = (bio) => async (dispatch) => {
	try {
		const headers = {
			authorization: localStorage.token,
		};

		const res = axios.put(
			`${BASE_URL}/api/users/profile/editbio`,
			{
				bio: bio,
			},
			{
				headers: headers,
			}
		);

		const user = res.data;

		dispatch(editProfileBio(user));
	} catch (err) {
		console.log(err);
	}
};

export const connectWithUserThunk = (id) => async (dispatch) => {
	try {
		const headers = {
			authorization: localStorage.token,
		};

		const res = axios.post(`${BASE_URL}/api/connections/${id}`, null, {
			headers: headers,
		});

		dispatch(connectWithUser());
	} catch (err) {
		console.log(err);
	}
};

export const favoriteUserThunk = (id) => async (dispatch) => {
	try {
		const headers = {
			authorization: localStorage.token,
		};

		const res = axios.post(`${BASE_URL}/api/favorites/${id}`, null, {
			headers: headers,
		});

		dispatch(connectWithUser());
	} catch (err) {
		console.log(err);
	}
};

export const getFavoritesThunk = (id) => async (dispatch) => {
	try {
		const headers = {
			authorization: localStorage.token,
		};

		const res = await axios.get(`${BASE_URL}/api/favorites/${id}`, {
			headers: headers,
		});

		const users = res.data;

		dispatch(getFavorites(users));
	} catch (err) {
		console.log(err);
	}
};

import {
	GET_USERS,
	LOGIN,
	LOGOUT,
	GET_PROFILE,
	EDIT_BIO,
	CREATE_CONNECTION,
	GET_FAVORITES,
	GET_CONNECTIONS,
	GET_OVERLAP_SCHEDULES,
	CREATE_INVITE,
	GET_CONFIRMED_SESSIONS,
} from "./actionTypes";
import axios from "axios";

const BASE_URL = "";

const headers = {
	authorization: localStorage.token,
};

export const getToken = () => {
	return localStorage.token;
};

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

const getConnections = (connections) => {
	return {
		type: GET_CONNECTIONS,
		payload: connections,
	};
};

const getOverlapSchedules = (overlaps) => {
	return {
		type: GET_OVERLAP_SCHEDULES,
		payload: overlaps,
	};
};

const createInvite = () => {
	return {
		type: CREATE_INVITE,
	};
};

const getConfirmedSessions = (sessions) => {
	return {
		type: GET_CONFIRMED_SESSIONS,
		payload: sessions,
	};
};

// Thunks
export const getUsersThunk = () => async (dispatch) => {
	try {
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
		const res = await axios.get(`${BASE_URL}/api/users/me`, { headers });

		const loggedInUser = res.data;

		dispatch(login(loggedInUser || {}));
	} catch (err) {
		console.error(err);
	}
};

export const getMyProfileThunk = () => async (dispatch) => {
	try {
		const res = await axios.get(`${BASE_URL}/api/users/profile`, { headers });

		const user = res.data;

		dispatch(getProfile(user));
	} catch (err) {
		console.log(err);
	}
};

export const getProfileThunk = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`${BASE_URL}/api/users/profile/${id}`, {
			headers: headers,
		});

		const user = res.data;

		dispatch(getProfile(user));
	} catch (err) {
		console.log(err);
	}
};

export const editProfileBioThunk = (bio) => async (dispatch) => {
	try {
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
		const res = await axios.get(`${BASE_URL}/api/favorites/${id}`, {
			headers: headers,
		});

		const users = res.data;

		dispatch(getFavorites(users));
	} catch (err) {
		console.log(err);
	}
};

export const getConnectionsThunk = () => async (dispatch) => {
	try {
		const res = await axios.get(`${BASE_URL}/api/connections/myConnections`, {
			headers: headers,
		});

		const connections = res.data;

		dispatch(getConnections(connections));
	} catch (err) {
		console.log(err);
	}
};

export const getOverlapSchedulesThunk = (id_1, id_2) => async (dispatch) => {
	try {
		const res = await axios.post(
			`${BASE_URL}/api/schedules/overlaps`,
			{ userId_1: Number(id_1), userId_2: Number(id_2) },
			{ headers: headers }
		);

		const overlaps = res.data;

		dispatch(getOverlapSchedules(overlaps));
	} catch (err) {
		console.log(err);
	}
};

export const createInviteThunk = (id, session) => async (dispatch) => {
	try {
		await axios.post(
			`${BASE_URL}/api/sessions`,
			{ session: session, inviteUserId: id },
			{ headers: headers }
		);

		dispatch(createInvite());
	} catch (err) {
		console.log(err);
	}
};

export const getConfirmedSessionsThunk = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`${BASE_URL}/api/sessions`, {
			headers: headers,
		});

		const sessions = res.data;

		const myData = sessions.filter((s) => (s.ownerId = id));
		const confirmedSessions = myData.filter((s) => s.isConfirmed);

		dispatch(getConfirmedSessions(confirmedSessions));
	} catch (err) {
		console.log(err);
	}
};

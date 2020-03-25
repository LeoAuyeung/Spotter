import axios from "axios";

import { GET_COMMITS, CLEAR_COMMITS } from "./actionTypes.js";

// Actions
const getCommits = commits => {
	return {
		type: GET_COMMITS,
		payload: commits
	};
};

export const clearCommits = () => {
	return {
		type: CLEAR_COMMITS
	};
};

// Thunks
export const getCommitsThunk = () => async dispatch => {
	try {
		const res = await axios.get(
			"https://api.github.com/repos/LeoAuyeung/Spotter/events"
		);
		dispatch(getCommits(res.data));
	} catch (err) {
		console.log(err);
	}
};

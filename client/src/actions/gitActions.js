import axios from "axios";

import { GET_COMMITS } from "./gitActions.js";

// Actions
const getCommits = commits => {
	return {
		type: GET_COMMITS,
		payload: commits
	};
};

// Thunks
export const getCommitsThunk = () => async dispatch => {
	try {
		const res = await axios.get(
			"https://api.github.com/repos/LeoAuyeung/Spotter/events"
		);
		console.log(res);
		dispatch(getCommits(res));
	} catch (err) {
		console.log(err);
	}
};

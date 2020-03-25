import { GET_COMMITS, CLEAR_COMMITS } from "../actions/actionTypes.js";

const initialState = {
	commits: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_COMMITS:
			return {
				...state,
				commits: action.payload.filter(x => x.type === "PushEvent")
			};
		case CLEAR_COMMITS:
			return {
				...state,
				commits: []
			};
		default:
			return state;
	}
};

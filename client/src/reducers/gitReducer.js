import { GET_COMMITS } from "../actions/actionTypes.js";

const initialState = {
	commits: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_COMMITS:
			return {
				...state,
				commits: action.payload
			};
		default:
			return state;
	}
};

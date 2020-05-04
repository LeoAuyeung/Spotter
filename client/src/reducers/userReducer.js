import { GET_USERS, LOGIN, LOGOUT } from "../actions/actionTypes";

const initialState = {
	loggedInUser: {},
	possibleMatches: {},
	currentUser: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_USERS:
			return {
				...state,
				possibleMatches: action.payload,
			};
		case LOGIN:
			return {
				...state,
				loggedInUser: action.payload,
			};
		case LOGOUT:
			return {
				...state,
				loggedInUser: {},
			};
		default:
			return state;
	}
};

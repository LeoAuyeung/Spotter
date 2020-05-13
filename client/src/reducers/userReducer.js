import {
	GET_USERS,
	LOGIN,
	LOGOUT,
	GET_MY_PROFILE,
	EDIT_BIO,
} from "../actions/actionTypes";

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
		case GET_MY_PROFILE:
			return {
				...state,
				currentUser: action.payload,
			};
		case EDIT_BIO:
			return {
				...state,
				currentUser: action.payload,
			};
		default:
			return state;
	}
};

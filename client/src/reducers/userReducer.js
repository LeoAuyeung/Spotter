import {
	GET_USERS,
	LOGIN,
	LOGOUT,
	GET_PROFILE,
	EDIT_BIO,
	CREATE_CONNECTION,
	GET_FAVORITES,
} from "../actions/actionTypes";

const initialState = {
	loggedInUser: {},
	possibleMatches: [],
	currentUser: {},
	favorites: [],
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
		case GET_PROFILE:
			return {
				...state,
				currentUser: action.payload,
			};
		case EDIT_BIO:
			return {
				...state,
				currentUser: action.payload,
			};
		case CREATE_CONNECTION:
			return {
				...state,
			};
		case GET_FAVORITES:
			return {
				...state,
				favorites: action.payload,
			};
		default:
			return state;
	}
};

import {
	GET_USERS,
	LOGIN,
	LOGOUT,
	GET_PROFILE,
	EDIT_BIO,
	CREATE_CONNECTION,
	GET_FAVORITES,
	GET_OVERLAP_SCHEDULES,
	CREATE_INVITE,
	GET_CONFIRMED_SESSIONS,
} from "../actions/actionTypes";

const initialState = {
	loggedInUser: {},
	possibleMatches: [],
	currentUser: {},
	favorites: [],
	connections: [],
	overlapTimes: [],
	sessions: [],
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
		case GET_OVERLAP_SCHEDULES:
			return {
				...state,
				overlapTimes: action.payload,
			};
		case CREATE_INVITE:
			return {
				...state,
			};
		case GET_CONFIRMED_SESSIONS:
			return {
				...state,
				sessions: action.payload,
			};
		default:
			return state;
	}
};

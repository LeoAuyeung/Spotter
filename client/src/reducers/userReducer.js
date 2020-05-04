import { ADD_USER, GET_USER, LOGIN, LOGOUT } from "../actions/actionTypes";

const initialState = {
	loggedInUser: {},
	currentUser: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_USER:
			return {
				...state,
				loggedInUser: action.payload
			};
		case GET_USER:
			return {
				...state,
				currUser: action.payload
			};
		case LOGIN:
			return {
				...state,
				loggedInUser: action.payload
			};
		case LOGOUT:
			return {
				...state,
				loggedInUser: {}
			};
		default:
			return state;
	}
};

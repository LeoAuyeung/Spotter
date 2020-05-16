import {
	GET_SCHEDULES,
	CREATE_SCHEDULE,
	EDIT_SCHEDULE,
} from "../actions/actionTypes";

const initialState = {
	currentSchedules: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_SCHEDULES:
			return {
				...state,
				currentSchedules: action.payload,
			};
		case CREATE_SCHEDULE:
			return {
				...state,
				currentSchedules: [...state.currentSchedules, action.payload],
			};
		case EDIT_SCHEDULE:
			return {
				...state,
				currentSchedules: action.payload,
			};
		default:
			return state;
	}
};

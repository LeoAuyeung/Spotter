import { GET_SCHEDULES } from "../actions/actionTypes";

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
		default:
			return state;
	}
};

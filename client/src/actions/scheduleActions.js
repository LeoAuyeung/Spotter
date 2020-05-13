import { GET_SCHEDULES } from "./actionTypes";
import axios from "axios";

const BASE_URL = "";

const getSchedules = (data) => {
	return {
		type: GET_SCHEDULES,
		payload: data,
	};
};

export const getSchedulesThunk = (id) => async (dispatch) => {
	try {
		const headers = {
			authorization: localStorage.token,
		};

		const res = await axios.get(`${BASE_URL}/api/schedules`);

		const data = res.data;

		const schedules = data.filter((s) => s.userId === id);

		dispatch(getSchedules(schedules));
	} catch (err) {
		console.log(err);
	}
};

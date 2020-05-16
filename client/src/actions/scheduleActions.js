import { GET_SCHEDULES } from "./actionTypes";
import axios from "axios";

const BASE_URL = "";

const getSchedules = (data) => {
	return {
		type: GET_SCHEDULES,
		payload: data,
	};
};

export const getSchedulesThunk = () => async (dispatch) => {
	try {
		const headers = {
			authorization: localStorage.token,
		};

		const res = await axios.get(`${BASE_URL}/api/schedules/myschedules`, {
			headers: headers,
		});

		const data = res.data;

		const weekdays = {
			1: "Sunday",
			2: "Monday",
			3: "Tuesday",
			4: "Wednesday",
			5: "Thursday",
			6: "Friday",
			7: "Saturday",
		};

		const processedData = data.map((s) => ({
			id: s.id,
			dayId: s.dayId,
			day: weekdays[s.dayId],
			startTime: s.startTime,
			endTime: s.endTime,
		}));

		dispatch(getSchedules(processedData));
	} catch (err) {
		console.log(err);
	}
};

// export const createScheduleThunk = (schedule) => async (dispatch) => {
// 	try {
// 		const headers = {
// 			authorization: localStorage.token,
// 		};

// 		const res = await axios.post(`${BASE_URL}/api/schedules`);

// 		// const res = axios.put(
// 		// 	`${BASE_URL}/api/users/profile/editbio`,
// 		// 	{
// 		// 		bio: bio,
// 		// 	},
// 		// 	{
// 		// 		headers: headers,
// 		// 	}
// 		// );
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

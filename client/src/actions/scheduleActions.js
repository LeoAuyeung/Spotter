import {
	GET_SCHEDULES,
	CREATE_SCHEDULE,
	EDIT_SCHEDULE,
	DELETE_SCHEDULE,
} from "./actionTypes";
import axios from "axios";

const BASE_URL = "";

const weekdays = {
	1: "Sunday",
	2: "Monday",
	3: "Tuesday",
	4: "Wednesday",
	5: "Thursday",
	6: "Friday",
	7: "Saturday",
};

const headers = {
	authorization: localStorage.token,
};

const getSchedules = (schedules) => {
	return {
		type: GET_SCHEDULES,
		payload: schedules,
	};
};

const createSchedule = (schedule) => {
	return {
		type: CREATE_SCHEDULE,
		payload: schedule,
	};
};

const editSchedule = (schedules) => {
	return {
		type: EDIT_SCHEDULE,
		payload: schedules,
	};
};

const deleteSchedule = (schedules) => {
	return {
		type: DELETE_SCHEDULE,
		payload: schedules,
	};
};

export const getSchedulesThunk = () => async (dispatch) => {
	try {
		const res = await axios.get(`${BASE_URL}/api/schedules/myschedules`, {
			headers: headers,
		});

		const data = res.data;

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

export const createScheduleThunk = (schedule) => async (dispatch) => {
	try {
		const res = await axios.post(`${BASE_URL}/api/schedules`, schedule, {
			headers: headers,
		});

		const newSchedule = res.data;

		const processedSchedule = {
			id: newSchedule.id,
			dayId: newSchedule.dayId,
			day: weekdays[newSchedule.dayId],
			startTime: newSchedule.startTime,
			endTime: newSchedule.endTime,
		};

		dispatch(createSchedule(processedSchedule));
	} catch (err) {
		console.log(err);
	}
};

export const editScheduleThunk = (id, schedule) => async (dispatch) => {
	try {
		await axios.put(`${BASE_URL}/api/schedules/${id}`, schedule, {
			headers: headers,
		});

		const res = await axios.get(`${BASE_URL}/api/schedules/myschedules`, {
			headers: headers,
		});

		const data = res.data;

		const processedData = data.map((s) => ({
			id: s.id,
			dayId: s.dayId,
			day: weekdays[s.dayId],
			startTime: s.startTime,
			endTime: s.endTime,
		}));

		dispatch(editSchedule(processedData));
	} catch (err) {
		console.log(err);
	}
};

export const deleteScheduleThunk = (id) => async (dispatch) => {
	try {
		await axios.delete(`${BASE_URL}/api/schedules/${id}`, {
			headers: headers,
		});

		const res = await axios.get(`${BASE_URL}/api/schedules/myschedules`, {
			headers: headers,
		});

		const data = res.data;

		const processedData = data.map((s) => ({
			id: s.id,
			dayId: s.dayId,
			day: weekdays[s.dayId],
			startTime: s.startTime,
			endTime: s.endTime,
		}));

		dispatch(deleteSchedule(processedData));
	} catch (err) {
		console.log(err);
	}
};

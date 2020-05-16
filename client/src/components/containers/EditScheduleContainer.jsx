import React, { Component } from "react";

import { compose } from "redux";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import { EditScheduleView } from "../views";

import {
	getSchedulesThunk,
	createScheduleThunk,
	editScheduleThunk,
	deleteScheduleThunk,
} from "../../actions";

const weekdays = {
	sunday: 1,
	monday: 2,
	tuesday: 3,
	wednesday: 4,
	thursday: 5,
	friday: 6,
	saturday: 7,
};

class EditScheduleContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			schedules: undefined,
			userSelected: false,
		};
	}

	componentDidMount = async () => {
		if (this.props.loggedInUser.id !== undefined) {
			await this.props.getSchedules();
			this.setState({
				schedules: this.props.schedules,
				userSelected: true,
			});
		} else {
			this.props.history.goBack();
		}
	};

	handleCreateSchedule = async (schedule) => {
		const data = {
			dayId: weekdays[schedule.day.toLowerCase()],
			startTime: schedule.startTime,
			endTime: schedule.endTime,
		};

		await this.props.createSchedule(data);

		this.setState({
			schedules: this.props.schedules,
		});
	};

	handleEditSchedule = async (id, schedule) => {
		const data = {
			dayId: weekdays[schedule.day.toLowerCase()],
			startTime: schedule.startTime,
			endTime: schedule.endTime,
		};

		await this.props.editSchedule(id, data);

		this.setState({
			schedules: this.props.schedules,
		});
	};

	handleDeleteSchedule = async (id) => {
		await this.props.deleteSchedule(id);

		this.setState({
			schedules: this.props.schedules,
		});
	};

	render() {
		return this.state.userSelected ? (
			<EditScheduleView
				schedules={this.state.schedules}
				handleCreateSchedule={this.handleCreateSchedule}
				handleEditSchedule={this.handleEditSchedule}
				handleDeleteSchedule={this.handleDeleteSchedule}
			/>
		) : (
			<div>Loading</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loggedInUser: state.user.loggedInUser,
		schedules: state.schedule.currentSchedules,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getSchedules: () => dispatch(getSchedulesThunk()),
		createSchedule: (schedule) => dispatch(createScheduleThunk(schedule)),
		editSchedule: (id, schedule) => dispatch(editScheduleThunk(id, schedule)),
		deleteSchedule: (id) => dispatch(deleteScheduleThunk(id)),
	};
};

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(EditScheduleContainer);

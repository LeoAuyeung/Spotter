import React, { Component } from "react";

import axios from "axios";

import { compose } from "redux";
import { withRouter } from "react-router";

import { connect } from "react-redux";
import { EditWorkoutView } from "../views";

const workouts = ["Bench Press", "Push Ups", "Running (treadmill)"];
const volumes = ["Pounds (lb)", "Reps", "Time (min)", "Distance (mi)"];

class EditWorkoutContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			workouts: workouts,
			measurements: volumes,
			amount: 0,
			workout: "",
			measurement: "",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	// componentDidMount = async () => {
	// 	const { currentUser } = this.props;

	// 	if (
	// 		Object.keys(currentUser).length === 0 &&
	// 		currentUser.constructor === Object
	// 	) {
	// 		this.props.history.push("/error");
	// 	} else {
	// 		const filteredWorkouts = this.props.currentUser.workouts.filter(
	// 			(workout, index, self) =>
	// 				self.findIndex((t) => t.workout.name === workout.workout.name) ===
	// 				index
	// 		);

	// 		const filteredVolumes = this.props.currentUser.workouts.filter(
	// 			(workout, index, self) =>
	// 				self.findIndex((t) => t.volume.name === workout.volume.name) === index
	// 		);

	// 		this.setState({
	// 			workouts: filteredWorkouts.map((w) => w.workout.name),
	// 			measurements: filteredVolumes.map((v) => v.volume.name),
	// 		});
	// 	}
	// };

	addWorkout = async () => {
		const headers = {
			authorization: localStorage.token,
		};

		const body = {
			id: Date.now(),
			userId: Number(this.props.currentUser.profile.id),
			workoutId: Number(workouts.indexOf(this.state.workout)) + 1,
			volumeId: Number(volumes.indexOf(this.state.measurement)) + 1,
			maxNumber: Number(this.state.amount),
		};

		await axios.post(`/api/userWorkoutVolumes`, body, {
			headers: headers,
		});

		this.props.history.goBack();
	};

	// EVENT HANDLERS
	handleChange = async (e) => {
		e.preventDefault();
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = async (e) => {
		// this is only if the user deletes the initial properties and leaves fields blank
		// Its okay if save changes is clicked and nothing actually changed
		e.preventDefault();

		this.addWorkout();
	};

	render() {
		return (
			<EditWorkoutView
				workouts={this.state.workouts}
				measurements={this.state.measurements}
				handleSubmit={this.handleSubmit}
				handleChange={this.handleChange}
				amount={this.state.amount}
				workout={this.state.workout}
				measurement={this.state.measurement}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: !!state.user.loggedInUser.email,
		currentUser: state.user.currentUser,
	};
};

export default compose(
	withRouter,
	connect(mapStateToProps, null)
)(EditWorkoutContainer);

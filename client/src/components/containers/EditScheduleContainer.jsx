import React, { Component } from "react";

import { compose } from "redux";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import { EditScheduleView } from "../views";

import { getSchedulesThunk } from "../../actions";

class EditScheduleContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{ name: "day", title: "Day" },
				{ name: "startTime", title: "Start Time" },
				{ name: "endTime", title: "EndTime" },
			],
			schedules: undefined,
			userSelected: false,
		};
	}

	componentDidMount = async () => {
		if (this.props.currentUser.profile !== undefined) {
			await this.props.getSchedules(this.props.currentUser.profile.id);
			this.setState({
				schedules: this.props.schedules,
				userSelected: true,
			});
		}
	};

	render() {
		return this.state.userSelected ? (
			<EditScheduleView
				rows={this.state.rows}
				columns={this.state.columns}
				schedules={this.state.schedules}
			/>
		) : (
			<div>Please select a user to edit calendar.</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.user.currentUser,
		schedules: state.schedule.currentSchedules,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getSchedules: (id) => dispatch(getSchedulesThunk(id)),
	};
};

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(EditScheduleContainer);

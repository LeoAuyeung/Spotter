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

	render() {
		return this.state.userSelected ? (
			<EditScheduleView
				rows={this.state.rows}
				columns={this.state.columns}
				schedules={this.state.schedules}
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
	};
};

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(EditScheduleContainer);

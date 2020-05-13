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
		};
	}

	componentDidMount = async () => {
		const { currentUser } = this.props;

		if (
			Object.keys(currentUser).length === 0 &&
			currentUser.constructor === Object
		) {
			this.props.history.push("/error");
		} else {
			await this.props.getSchedules(currentUser.profile.id);
			this.setState({
				schedules: this.props.schedules,
			});
		}
	};

	render() {
		return (
			<EditScheduleView
				rows={this.state.rows}
				columns={this.state.columns}
				schedules={this.state.schedules}
			/>
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

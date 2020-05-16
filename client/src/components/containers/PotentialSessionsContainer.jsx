import React, { Component } from "react";

import { compose } from "redux";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import { PotentialSessionsView } from "../views";

import { getOverlapSchedulesThunk, createInviteThunk } from "../../actions";

class PotentialSessionsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			overlapTimes: undefined,
			overlapFound: false,
			loaded: false,
		};
	}

	removeEmptyDays = (overlaps) => {
		const copy = overlaps;

		for (var prop in copy) {
			if (copy[prop].length === 0) {
				delete copy[prop];
			}
		}

		return copy;
	};

	componentDidMount = async () => {
		const { loggedInUser, currentUser } = this.props;

		if (loggedInUser.id !== undefined && currentUser.profile !== undefined) {
			await this.props.getOverlapSchedules(
				loggedInUser.id,
				currentUser.profile.id
			);

			const overlaps = this.removeEmptyDays(this.props.overlapTimes);

			if (
				Object.keys(overlaps).length !== 0 ||
				overlaps.constructor !== Object
			) {
				const dateMap = {
					1: "Sunday",
					2: "Monday",
					3: "Tuesday",
					4: "Wednesday",
					5: "Thursday",
					6: "Friday",
					7: "Saturday",
				};

				let flattenedOverlaps = [];
				for (var prop in overlaps) {
					let timeslots = overlaps[prop];
					for (var t in timeslots) {
						let ts = timeslots[t];
						let temp = {};
						temp.day = dateMap[prop];
						temp.start = ts[0];
						temp.end = ts[1];
						flattenedOverlaps.push(temp);
					}
				}

				this.setState({
					overlapTimes: flattenedOverlaps,
					overlapFound: true,
				});
			}

			this.setState({
				loaded: true,
			});
		} else {
			this.props.history.goBack();
		}
	};

	handleInvite = async (data) => {
		const session = data[0];
		const date = data[1];

		const sessionData = {
			startTime: `${date} ${session.start}`,
			endTime: `${date} ${session.end}`,
		};

		const id = this.props.currentUser.profile.id;

		await this.props.createInvite(id, sessionData);

		this.props.history.push(`/profile/${id}`);
		alert(
			`Invite sent for ${session.day} - ${date} from ${session.start} to ${session.end}!`
		);
	};

	render() {
		return this.state.loaded ? (
			this.state.overlapFound ? (
				<PotentialSessionsView
					currentUserProfile={this.props.currentUser.profile}
					overlapTimes={this.state.overlapTimes}
					handleInvite={this.handleInvite}
				/>
			) : (
				<div>No overlap found.</div>
			)
		) : (
			<div>Loading</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loggedInUser: state.user.loggedInUser,
		currentUser: state.user.currentUser,
		overlapTimes: state.user.overlapTimes,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getOverlapSchedules: (id_1, id_2) =>
			dispatch(getOverlapSchedulesThunk(id_1, id_2)),
		createInvite: (id, session) => dispatch(createInviteThunk(id, session)),
	};
};

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(PotentialSessionsContainer);

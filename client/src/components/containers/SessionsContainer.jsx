import React, { Component } from "react";

import { compose } from "redux";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";

import { getConfirmedSessionsThunk } from "../../actions";

class SessionsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sessions: undefined,
			sessionsFound: false,
			loaded: false,
		};
	}

	componentDidMount = async () => {
		const { loggedInUser } = this.props;

		if (loggedInUser.id !== undefined) {
			await this.props.getConfirmedSessions(loggedInUser.id);

			if (this.props.sessions.length > 0) {
				this.setState({
					sessions: this.props.sessions,
					sessionsFound: true,
				});
			}
			this.setState({
				loaded: true,
			});
		} else {
			this.props.history.goBack();
		}
	};

	render() {
		let view;
		let list;
		if (this.state.sessionsFound && this.state.loaded) {
			list = this.state.sessions.map((s) => (
				<li>
					{s.startTime} to {s.endTime}
				</li>
			));

			view = (
				<div>
					<Typography gutterBottom variant="h5" component="h2">
						Confirmed Sessions
					</Typography>
					<ul>{list}</ul>
				</div>
			);
		}

		return this.state.loaded ? (
			this.state.sessionsFound ? (
				view
			) : (
				<div>No confirmed sessions.</div>
			)
		) : (
			<div>Loading</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loggedInUser: state.user.loggedInUser,
		sessions: state.user.sessions,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getConfirmedSessions: (id) => dispatch(getConfirmedSessionsThunk(id)),
	};
};

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(SessionsContainer);

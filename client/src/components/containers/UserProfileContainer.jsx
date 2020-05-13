import React, { Component } from "react";

import { compose } from "redux";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import { me, getProfileThunk, connectWithUserThunk } from "../../actions";

import { UserProfileView } from "../views";

class UserProfileContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: undefined,
		};
	}

	componentDidMount = async () => {
		const id = window.location.href.split("/").pop();
		await this.props.getProfile(id);

		console.log("hello");
		this.setState({
			user: this.props.currentUser,
		});
	};

	// handleConnect = async () => {
	// 	const id = window.location.href.split("/").pop();

	// 	await this.props.connectWithUser(id);

	// 	window.location.reload();
	// };

	render() {
		return <UserProfileView user={this.state.user} />;
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: !!state.user.loggedInUser.email,
		currentUser: state.user.currentUser,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		me: () => dispatch(me()),
		getProfile: (id) => dispatch(getProfileThunk(id)),
		connectWithUser: (id) => dispatch(connectWithUserThunk(id)),
	};
};

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(UserProfileContainer);

import React, { Component } from "react";

import { compose } from "redux";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import { getProfileThunk, favoriteUserThunk } from "../../actions";

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

		this.setState({
			user: this.props.currentUser,
		});
	};

	handleConnect = () => {
		const id = window.location.href.split("/").pop();

		this.props.history.push(`/profile/${id}/connect`);
	};

	handleFavorite = async () => {
		const id = window.location.href.split("/").pop();

		await this.props.favoriteUser(id);
	};

	render() {
		return (
			<UserProfileView
				user={this.state.user}
				handleConnect={this.handleConnect}
				handleFavorite={this.handleFavorite}
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

const mapDispatchToProps = (dispatch) => {
	return {
		getProfile: (id) => dispatch(getProfileThunk(id)),
		favoriteUser: (id) => dispatch(favoriteUserThunk(id)),
	};
};

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(UserProfileContainer);

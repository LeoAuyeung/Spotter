import React, { Component } from "react";
import { connect } from "react-redux";

import { NavbarView } from "../views";

import { me, logoutThunk } from "../../actions";

class NavbarContainer extends Component {
	constructor(props) {
		super(props);
		props.loadInitialData();
	}

	render() {
		return (
			<NavbarView
				isLoggedIn={this.props.isLoggedIn}
				loggedInUser={this.props.loggedInUser}
				logout={this.props.logout}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: !!state.user.loggedInUser.email,
		loggedInUser: state.user.loggedInUser,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch(logoutThunk()),
		loadInitialData: () => dispatch(me()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);

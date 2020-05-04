import React, { Component } from "react";
import { connect } from "react-redux";

import { HomeView } from "../views";

class HomeContainer extends Component {
	render() {
		return (
			<HomeView isLoggedIn={this.props.isLoggedIn} logout={this.props.logout} />
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: !!state.user.loggedInUser.email,
	};
};

export default connect(mapStateToProps, null)(HomeContainer);

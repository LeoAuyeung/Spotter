import React, { Component } from "react";
import { connect } from "react-redux";

import { HomeView } from "../views";
import { logoutThunk } from "../../actions";

class HomeContainer extends Component {
	render() {
		return <HomeView logout={this.props.logout} />;
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch(logoutThunk()),
	};
};

export default connect(null, mapDispatchToProps)(HomeContainer);

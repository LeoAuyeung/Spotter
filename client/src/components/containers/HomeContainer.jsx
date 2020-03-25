import React, { Component } from "react";
import { connect } from "react-redux";

import { HomeView } from "../views";

class HomeContainer extends Component {
	render() {
		return <HomeView />;
	}
}

export default connect(null, null)(HomeContainer);

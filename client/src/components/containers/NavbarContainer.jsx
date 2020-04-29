import React, { Component } from "react";
import { connect } from "react-redux";

import { NavbarView } from "../views";

class NavbarContainer extends Component {
	render() {
		return <NavbarView />;
	}
}

export default connect(null, null)(NavbarContainer);

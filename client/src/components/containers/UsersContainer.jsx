import React, { Component } from "react";
import { connect } from "react-redux";

import { UsersView } from "../views";

class UsersContainer extends Component {
	render() {
		return <UsersView />;
	}
}

export default connect(null, null)(UsersContainer);

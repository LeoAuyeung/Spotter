import React, { Component } from "react";
import { connect } from "react-redux";

import { SignupView } from "../views";

class SignupContainer extends Component {
	render() {
		return <SignupView />;
	}
}

export default connect(null, null)(SignupContainer);

import React, { Component } from "react";
import { connect } from "react-redux";

import { SigninView } from "../views";

class SigninContainer extends Component {
	render() {
		return <SigninView />;
	}
}

export default connect(null, null)(SigninContainer);

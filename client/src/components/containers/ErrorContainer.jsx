import React, { Component } from "react";
import { connect } from "react-redux";

import { ErrorView } from "../views";

class ErrorContainer extends Component {
	render() {
		return (
			<ErrorView />
		);
	}
}



export default connect(null, null)(ErrorContainer);

import React, { Component } from "react";
import { connect } from "react-redux";

import { GithubView } from "../views";

class GithubContainer extends Component {
	render() {
		return <GithubView />;
	}
}

export default connect(null, null)(GithubContainer);

import React, { Component } from "react";
import { connect } from "react-redux";

import { PotentialSessionsView } from "../views";


class PotentialSessionsContainer extends Component {
	render() {
		return (
			<PotentialSessionsView
			/>
		);
	}
}



export default connect(null, null)(PotentialSessionsContainer);

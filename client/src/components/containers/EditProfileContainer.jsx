import React, { Component } from "react";
import { connect } from "react-redux";
import { EditProfileView } from "../views";


class EditProfileContainer extends Component {
	render() {
		return <EditProfileView />;
	}
}

export default connect(null, null)(EditProfileContainer);

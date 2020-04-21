import React, { Component } from "react";
import { connect } from "react-redux";
import { EditProfileView } from "../views";


class EditProfileContainer extends Component {
	onSubmit = async values => {
	};

	render() {
		return <EditProfileView 
		onSubmit = {this.onSubmit}
		/>;
	}
}

export default connect(null, null)(EditProfileContainer);

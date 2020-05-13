import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "redux";

import { EditProfileView } from "../views";
import { editProfileBioThunk } from "../../actions";

class EditProfileContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			description: "",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	// EVENT HANDLERS
	handleChange = async (e) => {
		e.preventDefault();
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = async (e) => {
		// this is only if the user deletes the initial properties and leaves fields blank
		// Its okay if save changes is clicked and nothing actually changed
		e.preventDefault();

		await this.props.editProfileBio(this.state.description);

		this.props.history.goBack();
	};

	render() {
		return (
			<EditProfileView
				handleChange={this.handleChange}
				handleSubmit={this.handleSubmit}
				description={this.state.description}
			/>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		editProfileBio: (bio) => dispatch(editProfileBioThunk(bio)),
	};
};

export default compose(
	withRouter,
	connect(null, mapDispatchToProps)
)(EditProfileContainer);

// export default withRouter(connect(null, mapDispatchToProps))(
// 	EditProfileContainer
// );

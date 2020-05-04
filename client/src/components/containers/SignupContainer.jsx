import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { SignupView } from "../views";
import { addUserThunk } from "../../actions";

class SignupContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: "",
			lastName: "",
			gender: "M",
			email: "",
			password: "",
			birthday: null,
			// hard-coded
			gender: "M",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	// EVENT HANDLERS
	handleChange = (e) => {
		e.preventDefault();
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = (event) => {
		const {
			email,
			password,
			firstName,
			lastName,
			birthday,
			gender,
		} = this.state;
		event.preventDefault();
		this.props.signUp(email, password, firstName, lastName, birthday, gender);
		this.props.history.push("/users");
	};

	render() {
		return (
			<SignupView
				handleSubmit={this.handleSubmit}
				handleChange={this.handleChange}
				firstName={this.state.firstName}
				lastName={this.state.lastName}
				email={this.state.email}
				password={this.state.password}
				birthday={this.state.birthday}
			/>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	signUp: (email, password, firstName, lastName, birthday, gender) =>
		dispatch(
			addUserThunk(email, password, firstName, lastName, birthday, gender)
		),
});

export default connect(null, mapDispatchToProps)(withRouter(SignupContainer));

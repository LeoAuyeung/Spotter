import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { SigninView } from "../views";
import { loginThunk } from "../../actions";

class SigninContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: ""
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	// EVENT HANDLERS
	handleChange = e => {
		e.preventDefault();
		this.setState({ [e.target.name]: e.target.value });
	};

	// handleSubmit = async (e) => {
	// 	// this is only if the user deletes the initial properties and leaves fields blank
	// 	// Its okay if save changes is clicked and nothing actually changed
	// 	e.preventDefault();

	// 	// send changed user data
	// 	let user = {
	// 		// NOT changed but need it for Link
	// 		email: this.state.email,
	// 		password: this.state.password
	// 	};

	// 	// send to edit User to update User AND the database
	// 	console.log(user)
	// };

	handleSubmit = event => {
		event.preventDefault();
		this.props.signIn(this.state.email, this.state.password);
		this.props.history.push();
	};

	render() {
		return <SigninView
			handleChange={this.handleChange}
			handleSubmit={this.handleSubmit}
			email={this.state.email}
			password={this.state.password}
		/>;
	}
}

const mapDispatchToProps = dispatch => ({
	signIn: (email, password) => dispatch(loginThunk(email, password))
});

export default connect(null, mapDispatchToProps)(withRouter(SigninContainer));

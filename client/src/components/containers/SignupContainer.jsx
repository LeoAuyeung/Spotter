import React, { Component } from "react";
import { connect } from "react-redux";

import { SignupView } from "../views";

class SignupContainer extends Component {
	constructor(props){
		super(props);
		this.state={
			firstName: "",
			lastName: "",
			email: "",
			password:""
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	 // EVENT HANDLERS
	 handleChange = async(e) => {
		 e.preventDefault();
		this.setState({ [e.target.name]: e.target.value });
	  };

	  handleSubmit = async(e) => {
		// this is only if the user deletes the initial properties and leaves fields blank
		// Its okay if save changes is clicked and nothing actually changed
		e.preventDefault();
		
		  // send changed user data
		  let user = {
			// NOT changed but need it for Link
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			password: this.state.password
		  };
	
		  // send to edit User to update User AND the database
		  console.log(user)
	  };
	render() {
		return <SignupView 
		handleSubmit = {this.handleSubmit}
		handleChange = {this.handleChange}
		firstName = {this.state.firstName}
		lastName = {this.state.lastName}
		email = {this.state.email}
		password = {this.state.password}
		/>;
	}
}

export default connect(null, null)(SignupContainer);

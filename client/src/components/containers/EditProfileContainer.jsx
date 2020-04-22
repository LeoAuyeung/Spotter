import React, { Component } from "react";
import { connect } from "react-redux";
import { EditProfileView } from "../views";


class EditProfileContainer extends Component {
	constructor(props){
		super(props);
		this.state={
			description: ""
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
		  let changedUser = {
			// NOT changed but need it for Link
			description: this.state.description,
		  };
	
		  // send to edit User to update User AND the database
		  console.log(changedUser)
	  };


	render() {
		return <EditProfileView 
		handleChange = {this.handleChange}
		handleSubmit = {this.handleSubmit}
		description = {this.state.description}
	
		/>;
		
	}
}

export default connect(null, null)(EditProfileContainer);

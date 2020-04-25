import React, { Component } from "react";
import { connect } from "react-redux";
import { EditWorkoutView } from "../views";


class EditWorkoutContainer extends Component {
	constructor(props){
		super(props);
		this.state={
            setOpen: false
		}
		this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this)
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
      handleClickOpen = () => {
        this.setState({setOpen: true})
      };
    
       handleClose = (value) => {
        this.setState({setOpen: false})      
    };     

	render() {
		return <EditWorkoutView 
		// handleChange = {this.handleChange}
		// handleSubmit = {this.handleSubmit}
        handleClickOpen = {this.handleClickOpen}
        handleClose = {this.handleClose}
        setOpen = {this.state.setOpen}
		/>;
		
	}
}

export default connect(null, null)(EditWorkoutContainer);

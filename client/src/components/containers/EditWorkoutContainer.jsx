import React, { Component } from "react";
import { connect } from "react-redux";
import { EditWorkoutView } from "../views";


class EditWorkoutContainer extends Component {
	constructor(props){
		super(props);
		this.state={
			setOpen: false,
			workouts: ["deadlifts", "bench press", "squat"],
			measurements: ["lbs", "bodyweight"],
			amount: 0,
			workout: "",
			measurement: ""
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
		  let changedWorkout = {
			// NOT changed but need it for Link
			workout: this.state.workout,
			amount: this.state.amount,
			measurement: this.state.measurement
		  };
	
		  // send to edit User to update User AND the database
		  console.log(changedWorkout)
	  };
      handleClickOpen = () => {
        this.setState({setOpen: true})
      };
    
       handleClose = (value) => {
        this.setState({setOpen: false})      
    };     

	render() {
		return <EditWorkoutView 
        // handleClickOpen = {this.handleClickOpen}
        // handleClose = {this.handleClose}
		setOpen = {this.state.setOpen}
		workouts = {this.state.workouts}
		measurements = {this.state.measurements}
		handleSubmit = {this.handleSubmit}
		handleChange = {this.handleChange}
		amount = {this.state.amount}
		workout = {this.state.workout}
		measurement = {this.state.measurement}
		/>;
		
	}
}

export default connect(null, null)(EditWorkoutContainer);

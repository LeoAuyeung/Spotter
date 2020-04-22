import React, { Component } from "react";
import { connect } from "react-redux";

import { SignupView } from "../views";

class SignupContainer extends Component {
	constructor(props){
		super(props);
		this.state={

		}
	}
	handleSubmit = async(e)=>{

	}
	render() {
		return <SignupView 
		handleSubmit = {this.handleSubmit}
		/>;
	}
}

export default connect(null, null)(SignupContainer);

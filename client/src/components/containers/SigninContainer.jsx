import React, { Component } from "react";
import { connect } from "react-redux";

import { SigninView } from "../views";

class SigninContainer extends Component {
    constructor(props){
		super(props);
		this.state={

		}
	}
	handleSubmit = async(e)=>{
    }

	render() {
		return <SigninView 
        handleSubmit = {this.handleSubmit}
        />;
	}
}

export default connect(null, null)(SigninContainer);

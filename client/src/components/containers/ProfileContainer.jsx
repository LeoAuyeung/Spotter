import React, { Component } from "react";
import { connect } from "react-redux";

import { ProfileView } from "../views";

class ProfileContainer extends Component {
    constructor(props){
        super(props)
        this.state={
        }
    }

 

	render() {
		return (
            <ProfileView/>        
        )
	}
}

export default connect(null, null)(ProfileContainer);

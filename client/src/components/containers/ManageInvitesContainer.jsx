import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import { ManageInvitesView } from "../views";

class ManageInvitesContainer extends Component {
    constructor(props){
        super(props)
        this.state={
        }
	}
	
	componentDidMount(){
		const BASE_URL = "";
		const headers = {
			authorization: localStorage.token,
		};
		let currentPotentialInvites = async () => await axios.get(`${BASE_URL}/api/users/`, { headers });
		
	}

 

	render() {
		return (
            <div></div>      
        )
	}
}

export default connect(null, null)(ManageInvitesContainer);


import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import { ManageInvitesView } from "../views";

class ManageInvitesContainer extends Component {
    constructor(props){
        super(props)
        this.state={
			currInvites : undefined
        }
	}
	
	async componentDidMount(){
		const BASE_URL = "";
		const headers = {
			authorization: localStorage.token,
		};

		let currentPotentialInvites = await axios.get(`${BASE_URL}/api/users/pendinginvites`, { headers });
		this.setState({ currInvites: currentPotentialInvites })
	}

 

	render() {
		console.log(this.state.currInvites)
		/*
		const newList = this.state.currInvites.map(currInvite => {
			<div>


			</div>


		})
		*/
		return (
            <div></div>      
        )
	}
}

export default connect(null, null)(ManageInvitesContainer);


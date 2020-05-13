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
		this.setState({ currInvites: currentPotentialInvites.data })
	}

	async acceptInvite(inviteId){
		const BASE_URL = "";
		const headers = {
			authorization: localStorage.token,
		};
		console.log(headers)
		var data = {}
		const sessionId = inviteId;

		let currentPotentialInvites = await axios.post(`${BASE_URL}/api/sessions/${sessionId}/accept`, data, {headers : {authorization: localStorage.token}});
		window.location.reload();


	}

 	async denyInvite(inviteId){
		const BASE_URL = "";
		const headers = {
			
		};

		const sessionId = inviteId;
		var data = {}
		let currentPotentialInvites = await axios.post(`${BASE_URL}/api/sessions/${sessionId}/deny`, data, {headers : {authorization: localStorage.token}});
		window.location.reload();
	
	}


	render() {
		console.log(this.state.currInvites)
		if (this.state.currInvites == undefined){
			return ""
		}
		var newList = this.state.currInvites.map(currInvite => {
			return (
			<div>
				id: {currInvite.session.id}
				Session with: {currInvite.otherUser.email}
				Session start Time: {currInvite.session.startTime}
				Session end Time: {currInvite.session.endTime}
				<button type="button" onClick={() => this.acceptInvite(currInvite.session.id)}>Accept</button>
				<button type="button" onClick={() => this.denyInvite(currInvite.session.id)}>Deny</button>
				<br></br>
			</div>)

		});
		return (
            <div>
				{newList}
			</div>      
        )
	}
}

export default connect(null, null)(ManageInvitesContainer);


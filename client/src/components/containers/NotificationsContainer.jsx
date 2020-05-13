import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import { ManageInvitesView } from "../views";

class NotificationsContainer extends Component {
    constructor(props){
        super(props)
        this.state={
			currNotifications : undefined
        }
	}
	
	async componentDidMount(){
		const BASE_URL = "";
		const headers = {
			authorization: localStorage.token,
		};

		let currNotificationList = await axios.get(`${BASE_URL}/api/users/notifications`, { headers });
		this.setState({ currNotifications: currNotificationList.data })
	}

	async readNotification(inviteId){
		const BASE_URL = "";
		const headers = {
			authorization: localStorage.token,
		};
		console.log(headers)
		var data = {}

		let currentPotentialInvites = await axios.get(`${BASE_URL}/api/users/notifications/${inviteId}/read`, {headers : {authorization: localStorage.token}});
		window.location.reload();


	}


	render() {
		console.log(this.state.currInvites)
		if (this.state.currNotifications == undefined){
			return ""
		}
		var newList = this.state.currNotifications.map(currNotif => {
			return (
			<div>
				SessionId: {currNotif.sessionId} - Message: {currNotif.message}
				<button type="button" onClick={() => this.readNotification(currNotif.id)}>Read</button>

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

export default connect(null, null)(NotificationsContainer);


import React, { Component } from "react";
import { connect } from "react-redux";

import { UserProfileView } from "../views";

class UserProfileContainer extends Component {
    constructor(props){
        super(props)
        this.state={
            user: 
                {name: "mary", 
                desc: "my name is mary", 
                age: "21",
                gender: "female",
                img: "https://www.freeiconspng.com/uploads/female-icon-11.jpg"},
                workouts: [{
                    "workout": {
                        name: "push ups"
                    },
                    "amount": "40",
                    "volume": {
                        name: "reps"
                    }
                }]
        }
    }

 

	render() {
		return (
            <UserProfileView 
                user = {this.state.user}
                workouts = {this.state.workouts}
                

            />        
        )
	}
}

export default connect(null, null)(UserProfileContainer);

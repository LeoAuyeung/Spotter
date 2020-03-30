import React, { Component } from "react";
import { connect } from "react-redux";

import { UsersView } from "../views";

class UsersContainer extends Component {
    constructor(props){
        super(props)
        this.state={
            users: [
                {name: "mary"},
                {name: "bob"}
            ]
        }
    }
	render() {
		return <UsersView 
            users={this.state.users}
        />;
	}
}

export default connect(null, null)(UsersContainer);

import React, { Component } from "react";
import { connect } from "react-redux";

import { UsersView } from "../views";

class UsersContainer extends Component {
    constructor(props){
        super(props)
        this.state={
            filter: "",
            users: [
                {name: "mary", gender: "female"},
                {name: "bob", gender: "male"}
            ]
        }
    }

    handleChange = e =>{
        this.setState({filter: e.target.value})
    }

    filterItems = () =>{
        const { filter, users } = this.state;
        const lowercaseFilter = filter.toLowerCase();
        const filteredData = filter === "" ? users : users.filter(item => item.gender === lowercaseFilter);
        return filteredData
    }

	render() {
		return <UsersView 
            users={this.state.users}
            filter = {this.state.filter}
            handleChange = {this.handleChange}
            filterItems = {this.filterItems}
        />;
	}
}

export default connect(null, null)(UsersContainer);

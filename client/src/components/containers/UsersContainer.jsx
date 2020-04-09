import React, { Component } from "react";
import { connect } from "react-redux";

import { UsersView } from "../views";

class UsersContainer extends Component {
    constructor(props){
        super(props)
        this.state={
            filter: "",
            users: [
                {name: "mary", gender: "female", img: "https://www.freeiconspng.com/uploads/female-icon-11.jpg"},
                {name: "bob", gender: "male", img: "https://www.falconprecisionengineering.co.uk/wp-content/uploads/2017/03/male-profile.png"}
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
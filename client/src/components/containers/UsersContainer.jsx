import React, { Component } from "react";
import { connect } from "react-redux";

import { getUsersThunk } from "../../actions";

import { UsersView } from "../views";

class UsersContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: "",
			users: [],
		};
	}

	componentDidMount = async () => {
		if (this.props.isLoggedIn) {
			await this.props.getUsers();
			this.setState({ users: this.props.users });
		}
	};

	handleChange = (e) => {
		this.setState({ filter: e.target.value });
	};

	filterItems = () => {
		const { filter, users } = this.state;
		const pickedFilter = filter;
		const filteredData =
			filter === ""
				? users
				: users.filter((item) => item.gender === pickedFilter);
		return filteredData;
	};

	render() {
		return this.props.isLoggedIn ? (
			<UsersView
				users={this.props.users}
				filter={this.state.filter}
				handleChange={this.handleChange}
				filterItems={this.filterItems}
			/>
		) : (
			<h1>Error: not signed in. Please sign in.</h1>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: !!state.user.loggedInUser.email,
		users: state.user.possibleMatches,
	};
};

const mapDispathToProps = (dispatch) => {
	return {
		getUsers: () => dispatch(getUsersThunk()),
	};
};

export default connect(mapStateToProps, mapDispathToProps)(UsersContainer);

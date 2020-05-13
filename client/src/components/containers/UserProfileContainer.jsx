import React, { Component } from "react";
import { connect } from "react-redux";

import { me, getProfileThunk } from "../../actions";

import { UserProfileView } from "../views";

class UserProfileContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: undefined,
		};
	}

	componentDidMount = async () => {
		await me();

		const id = window.location.href.split("/").pop();
		await this.props.getProfile(id);

		this.setState({
			user: this.props.currentUser,
		});
	};

	render() {
		return <UserProfileView user={this.state.user} />;
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: !!state.user.loggedInUser.email,
		currentUser: state.user.currentUser,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getProfile: (id) => dispatch(getProfileThunk(id)),
		me: () => dispatch(me()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserProfileContainer);

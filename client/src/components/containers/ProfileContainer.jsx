import React, { Component } from "react";
import { connect } from "react-redux";

import { getMyProfileThunk } from "../../actions";

import { ProfileView } from "../views";

class ProfileContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: undefined,
		};
	}

	componentDidMount = async () => {
		await this.props.getMyProfile();

		this.setState({
			user: this.props.currentUser,
		});
	};

	render() {
		return <ProfileView user={this.state.user} />;
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
		getMyProfile: () => dispatch(getMyProfileThunk()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);

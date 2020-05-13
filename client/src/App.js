import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

import {
	HomeContainer,
	UsersContainer,
	ProfileContainer,
	UserProfileContainer,
	EditProfileContainer,
	SigninContainer,
	SignupContainer,
	EditWorkoutContainer,
	NavbarContainer,
	EditScheduleContainer,
	ErrorContainer,
} from "./components";

import { me } from "./actions";

class App extends Component {
	constructor(props) {
		super(props);
		props.loadInitialData();
	}

	render() {
		return (
			<Router>
				<NavbarContainer></NavbarContainer>
				<Route exact path="/" render={() => <HomeContainer />} />
				<Route exact path="/signin" render={() => <SigninContainer />} />
				<Route exact path="/signup" render={() => <SignupContainer />} />
				<Route exact path="/users" render={() => <UsersContainer />} />
				<Route exact path="/profile" render={() => <ProfileContainer />} />
				<Route
					exact
					path="/profile/:id"
					render={() => <UserProfileContainer />}
				/>
				<Route exact path="/edit" render={() => <EditProfileContainer />} />
				<Route
					exact
					path="/edit/workout"
					render={() => <EditWorkoutContainer />}
				/>
				<Route
					exact
					path="/edit/schedule"
					render={() => <EditScheduleContainer />}
				/>
				<Route exact path="/error" render={() => <ErrorContainer />} />
			</Router>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadInitialData: () => dispatch(me()),
	};
};

export default connect(null, mapDispatchToProps)(App);

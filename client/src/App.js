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
	ManageInvitesContainer,
	NotificationsContainer,
	FavoritesContainer,
	PotentialSessionsContainer,
	ConnectionsContainer,
} from "./components";

import { me, getToken } from "./actions";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
		};

		this.checkAuthentication();
	}

	checkAuthentication = async () => {
		if (getToken() !== undefined) {
			await this.props.loadInitialData();
		} else {
			this.setState({
				loading: false,
			});
		}
	};

	render() {
		const data = (
			<Router>
				<NavbarContainer></NavbarContainer>
				<Route exact path="/" render={() => <HomeContainer />} />
				<Route exact path="/signin" render={() => <SigninContainer />} />
				<Route exact path="/signup" render={() => <SignupContainer />} />
				<Route exact path="/users" render={() => <UsersContainer />} />
				<Route exact path="/profile" render={() => <ProfileContainer />} />
				<Route
					exact
					path="/invites"
					render={() => <ManageInvitesContainer />}
				/>
				<Route
					exact
					path="/notifications"
					render={() => <NotificationsContainer />}
				/>

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
				<Route exact path="/favorites" render={() => <FavoritesContainer />} />
				<Route
					exact
					path="/connections"
					render={() => <ConnectionsContainer />}
				/>
				<Route
					exact
					path="/connect/find/sessions"
					render={() => <PotentialSessionsContainer />}
				/>
			</Router>
		);

		const loading = <div>Logging in. Please wait.</div>;

		return this.state.loading ? data : loading;
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadInitialData: () => dispatch(me()),
	};
};

export default connect(null, mapDispatchToProps)(App);

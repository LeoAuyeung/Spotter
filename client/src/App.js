import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";


import { HomeContainer, UsersContainer, ProfileContainer, UserProfileContainer, EditProfileContainer, SigninContainer, SignupContainer, EditWorkoutContainer, NavbarContainer} from "./components";

function App() {
	return (
		<div>
		<Router>
			<NavbarContainer></NavbarContainer>

			<Route exact path="/" render={() => <SigninContainer />} />
			<Route exact path="/signup" render={() => <SignupContainer />} />
			{/* <Route exact path="/home" render={() => <HomeContainer />} /> */}
			<Route exact path="/users" render={() => <UsersContainer />} />
			<Route exact path="/profile" render={() => <ProfileContainer />} />
			<Route exact path="/profile/:name" render={() => <UserProfileContainer />} />
			<Route exact path="/edit" render={() => <EditProfileContainer />} />
			<Route exact path="/edit/workout" render={() => <EditWorkoutContainer />} />
		</Router>
		</div>
		
	);
}

export default connect(null, null)(App);

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

import { HomeContainer, SigninContainer, UsersContainer, ProfileContainer, SignupContainer } from "./components";


function App() {
	return (
		<Router>
			<Route exact path="/" render={() => <SigninContainer />} />
			<Route exact path="/signup" render={() => <SignupContainer />} />
			<Route exact path="/home" render={() => <HomeContainer />} />
			<Route exact path="/users" render={() => <UsersContainer />} />
			<Route exact path="/profile/:name" render={() => <ProfileContainer />} />
		</Router>
	);
}

export default connect(null, null)(App);

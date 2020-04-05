import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

import { HomeContainer, UsersContainer, ProfileContainer } from "./components";

function App() {
	return (
		<Router>
			<Route exact path="/" render={() => <HomeContainer />} />
			<Route exact path="/users" render={() => <UsersContainer />} />
			<Route exact path="/profile" render={() => <ProfileContainer />} />
		</Router>
	);
}

export default connect(null, null)(App);

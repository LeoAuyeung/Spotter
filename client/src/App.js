import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

import { HomeContainer, MapViewContainer } from "./components";

function App() {
	return (
		<Router>
			<Route exact path="/" render={() => <HomeContainer />} />
			<Route exact path="/map" render={() => <MapViewContainer />} />
		</Router>
	);
}

export default connect(null, null)(App);

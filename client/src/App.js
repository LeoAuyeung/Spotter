import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

import { HomeContainer } from "./components";

function App() {
	return (
		<Router>
			<Route exact path="/" render={() => <HomeContainer />} />
		</Router>
	);
}

export default connect(null, null)(App);

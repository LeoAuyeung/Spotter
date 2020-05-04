import React from "react";
import { Link } from "react-router-dom";

import { LinkButton } from "../utilities/";

const HomeView = (props) => {
	return (
		<div>
			<h1>Spotter</h1>
			<Link to="/signin">Sign In</Link>
			<Link to="/signup">Sign Up</Link>
			<LinkButton onClick={props.logout} to="/">
				Sign Out
			</LinkButton>
		</div>
	);
};

export default HomeView;

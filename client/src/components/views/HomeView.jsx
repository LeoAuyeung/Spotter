import React from "react";
import {Link} from 'react-router-dom'
const HomeView = props => {
	return (
		<div>
			<h1>People say hello world but never how is world.</h1>
			<Link to = "/profile">Profile</Link>
		</div>
	);
};

export default HomeView;

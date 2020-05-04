import React from "react";
import { Link } from "react-router-dom";

const HomeView = (props) => {
	return <div>{props.isLoggedIn ? <Link to="/users">Users</Link> : ""}</div>;
};

export default HomeView;

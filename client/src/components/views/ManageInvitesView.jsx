import React from "react";
import { Link } from "react-router-dom";

const ManageInvitesView = (props) => {
	return <div>{props.isLoggedIn ? <Link to="/users">Users</Link> : ""}</div>;
};

export default ManageInvitesView;

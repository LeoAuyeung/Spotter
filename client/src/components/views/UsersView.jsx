import React from "react";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import "./Users.css";
const UsersView = (props) => {
	const { users, handleChange, filterItems } = props;
	return (
		<div>
			<div>
				<Select onChange={handleChange}>
					<MenuItem value="">Select a filter</MenuItem>
					<MenuItem value="male">Male</MenuItem>
					<MenuItem value="female">Female</MenuItem>
				</Select>
			</div>
			{users
				? filterItems(users).map((c) => {
						return (
							<div className="users-container">
								<h1>
									<Avatar src={c.profileLink} alt="profile-img"></Avatar>
									<span>{c.first}</span>
									<Link to={`/profile/${c.id}`}>
										<Button
											variant="contained"
											className="btn btn-primary pull-right"
										>
											View Profile
										</Button>
									</Link>
								</h1>
							</div>
						);
				  })
				: ""}
		</div>
	);
};

export default UsersView;

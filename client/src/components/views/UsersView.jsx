import React from "react";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import "./Users.css";

const avatarStyle = {
	width: "110px",
	height: "110px",
	marginRight: "20px",
};

const useStyles = makeStyles({
	filter: {
		margin: "30px",
	},
});

const UsersView = (props) => {
	const { users, handleChange, filterItems } = props;

	const classes = useStyles();

	return (
		<div>
			<div className={classes.filter}>
				<Select onChange={handleChange}>
					<MenuItem value="">Select a filter</MenuItem>
					<MenuItem value="M">Male</MenuItem>
					<MenuItem value="F">Female</MenuItem>
				</Select>
			</div>
			{users
				? filterItems(users).map((c) => {
						return (
							<div className="users-container">
								<h1>
									<Avatar
										src={c.profileLink}
										alt="profile-img"
										style={avatarStyle}
									></Avatar>
									<span>
										{c.first} {c.last}
									</span>
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

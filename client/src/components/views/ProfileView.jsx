import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import "./Profile.css";

const avatarStyle = {
	width: "100px",
	height: "100px",
};
const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
});

//stackoverflow.com/questions/4060004/calculate-age-given-the-birth-date-in-the-format-yyyymmdd
const calculateAge = (birthday) => {
	// birthday is a date
	var ageDifMs = Date.now() - birthday.getTime();
	var ageDate = new Date(ageDifMs); // miliseconds from epoch
	return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const ProfileView = (props) => {
	const classes = useStyles();

	let workoutCards;
	if (props.user.workouts !== undefined) {
		workoutCards = props.user.workouts.map((c, index) => (
			<Card className={classes.root}>
				<CardMedia
					component="img"
					height="140"
					image
					src={props.user.profile.profileLink}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2"></Typography>
					<Typography
						variant="body2"
						color="textSecondary"
						component="p"
					></Typography>
				</CardContent>
			</Card>
		));
	}

	return (
		<div>
			<div>
				<Card>
					<CardContent>
						<div className="user-profile">
							<Avatar
								src={props.user.profile.profileLink}
								style={avatarStyle}
							></Avatar>
							<div>
								<h1>
									{props.user.first} {props.user.last}
								</h1>
								<p>
									{props.user.gender} || {22}
								</p>
								<p>{props.user.bio}</p>
							</div>
						</div>
						<Button variant="contained" className="btn btn-primary pull-right">
							<Link className="profile-link" to="/edit/workout">
								Edit Workout
							</Link>
						</Button>

						<Button variant="contained" className="btn btn-primary pull-right">
							<Link className="profile-link" to="/edit">
								Edit Profile
							</Link>
						</Button>
						<Button variant="contained" className="btn btn-primary pull-right">
							<Link className="profile-link" to="/edit/schedule">
								Edit Calender
							</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
			<br></br>
			<div>
				<Card>
					<CardContent>
						Workouts
						{props.user.workouts === undefined ? "" : workoutCards}
					</CardContent>
				</Card>
			</div>
			<br></br>

			<div>
				<Card>
					<CardContent>Stats</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default ProfileView;

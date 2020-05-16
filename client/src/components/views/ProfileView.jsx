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
	width: "200px",
	height: "200px",
	marginRight: "20px",
};
const useStyles = makeStyles({
	card: {
		maxWidth: 345,
		margin: 20,
	},
	container: {
		display: "flex",
		flexDirection: "row",
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
	const { user } = props;

	const classes = useStyles();

	let workoutCards;
	let connectionCards;
	let userProfile;

	if (user !== undefined) {
		const { profile, connections, workouts } = user;
		const { first, last, gender, dob, profileLink, bio } = profile;
		const age = calculateAge(new Date(dob));

		if (workouts !== undefined) {
			//stackoverflow.com/questions/2218999/remove-duplicates-from-an-array-of-objects-in-javascript
			const filteredWorkouts = workouts.filter(
				(workout, index, self) =>
					self.findIndex((t) => t.workout.name === workout.workout.name) ===
					index
			);

			workoutCards = (
				<div className={classes.container}>
					{filteredWorkouts.map((w) => (
						<Card className={classes.card}>
							<CardMedia
								component="img"
								height="200"
								image={w.workout.imageLink}
							/>
							<CardContent>
								<Typography gutterBottom variant="h5" component="h2">
									{w.workout.name}
								</Typography>
								<Typography variant="body2" color="textSecondary" component="p">
									{w.amount} / {w.volume.name}
								</Typography>
							</CardContent>
						</Card>
					))}
				</div>
			);
		}

		userProfile = (
			<div>
				<div>
					<Card>
						<CardContent>
							<div className="user-profile">
								<Avatar src={profileLink} style={avatarStyle}></Avatar>
								<div>
									<h1>
										{first} {last}
									</h1>
									<p>
										{gender} || {age}
									</p>
									<p>{bio}</p>
								</div>
							</div>
							<Button
								variant="contained"
								className="btn btn-primary pull-right"
							>
								<Link className="profile-link" to="/edit/workout">
									Add Workout
								</Link>
							</Button>

							<Button
								variant="contained"
								className="btn btn-primary pull-right"
							>
								<Link className="profile-link" to="/edit">
									Edit Profile
								</Link>
							</Button>
							<Button
								variant="contained"
								className="btn btn-primary pull-right"
							>
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
							<Typography gutterBottom variant="h5" component="h2">
								Workouts
							</Typography>
							{workouts === undefined ? "" : workoutCards}
						</CardContent>
					</Card>
				</div>
				<br></br>
			</div>
		);
	}

	return user === undefined ? "" : userProfile;
};

export default ProfileView;

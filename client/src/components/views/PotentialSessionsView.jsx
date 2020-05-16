import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
var getNearestDayOfWeek = require("get-nearest-day-of-week");

const avatarStyle = {
	width: "100px",
	height: "100px",
	marginRight: "30px",
};

const PotentialSessionsView = (props) => {
	const currDate = new Date();
	var add7Days = currDate;
	add7Days.setDate(add7Days.getDate() + 7);

	const monday =
		getNearestDayOfWeek(currDate, 1).format("YYYY-MM-DD") >= currDate
			? getNearestDayOfWeek(currDate, 1).format("YYYY-MM-DD")
			: getNearestDayOfWeek(add7Days, 1).format("YYYY-MM-DD");
	const tuesday =
		getNearestDayOfWeek(currDate, 2).format("YYYY-MM-DD") >= currDate
			? getNearestDayOfWeek(currDate, 2).format("YYYY-MM-DD")
			: getNearestDayOfWeek(add7Days, 2).format("YYYY-MM-DD");
	const wednesday =
		getNearestDayOfWeek(currDate, 3).format("YYYY-MM-DD") >= currDate
			? getNearestDayOfWeek(currDate, 3).format("YYYY-MM-DD")
			: getNearestDayOfWeek(add7Days, 3).format("YYYY-MM-DD");
	const thursday =
		getNearestDayOfWeek(currDate, 4).format("YYYY-MM-DD") >= currDate
			? getNearestDayOfWeek(currDate, 4).format("YYYY-MM-DD")
			: getNearestDayOfWeek(add7Days, 4).format("YYYY-MM-DD");
	const friday =
		getNearestDayOfWeek(currDate, 5).format("YYYY-MM-DD") >= currDate
			? getNearestDayOfWeek(currDate, 5).format("YYYY-MM-DD")
			: getNearestDayOfWeek(add7Days, 5).format("YYYY-MM-DD");
	const saturday =
		getNearestDayOfWeek(currDate, 6).format("YYYY-MM-DD") >= currDate
			? getNearestDayOfWeek(currDate, 6).format("YYYY-MM-DD")
			: getNearestDayOfWeek(add7Days, 6).format("YYYY-MM-DD");
	const sunday =
		getNearestDayOfWeek(currDate, 7).format("YYYY-MM-DD") >= currDate
			? getNearestDayOfWeek(currDate, 7).format("YYYY-MM-DD")
			: getNearestDayOfWeek(add7Days, 7).format("YYYY-MM-DD");

	const dateMap = {
		sunday,
		monday,
		tuesday,
		wednesday,
		thursday,
		friday,
		saturday,
	};

	let { overlapTimes, currentUserProfile, handleInvite } = props;

	let sessions;
	let view;
	if (overlapTimes.length > 0) {
		sessions = overlapTimes.map((ts) => (
			<div>
				<Card>
					<CardContent>
						<div className="user-profile">
							<Avatar
								src={currentUserProfile.profileLink}
								style={avatarStyle}
							></Avatar>
							<div>
								<p>
									Date: {ts.day} - {dateMap[ts.day.toLowerCase()]}
								</p>
								<p>
									Time: {ts.start} - {ts.end}
								</p>
							</div>
						</div>
						<Button
							variant="contained"
							className="btn btn-primary pull-right"
							onClick={() => handleInvite([ts, dateMap[ts.day.toLowerCase()]])}
						>
							Invite
						</Button>
					</CardContent>
				</Card>
				<br></br>
				<br></br>
			</div>
		));

		view = (
			<div>
				<Typography gutterBottom variant="h5" component="h2">
					Possible sessions for {currentUserProfile.first}{" "}
					{currentUserProfile.last}
				</Typography>
				<br></br>
				{sessions}
			</div>
		);
	}

	return overlapTimes.length > 0 ? view : <div>Loading</div>;
};

export default PotentialSessionsView;

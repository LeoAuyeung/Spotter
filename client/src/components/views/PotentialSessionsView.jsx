import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
var getNearestDayOfWeek = require('get-nearest-day-of-week')

const avatarStyle = {
	width: "100px",
	height: "100px",
	marginRight: "30px",
};

const PotentialSessionsView = (props) => {
	const { sessions } = props;
	const currDate = new  Date()
	var add7Days = currDate
	add7Days.setDate(add7Days.getDate() + 7);

	const monday = getNearestDayOfWeek(currDate, 1).format("YYYY-MM-DD")  >= currDate ? getNearestDayOfWeek(currDate, 1).format("YYYY-MM-DD") : getNearestDayOfWeek(add7Days, 1).format("YYYY-MM-DD")
	const tuesday = getNearestDayOfWeek(currDate, 2).format("YYYY-MM-DD")  >= currDate ? getNearestDayOfWeek(currDate, 2).format("YYYY-MM-DD") : getNearestDayOfWeek(add7Days, 2).format("YYYY-MM-DD")
	const wednesday = getNearestDayOfWeek(currDate, 3).format("YYYY-MM-DD")  >= currDate ? getNearestDayOfWeek(currDate, 3).format("YYYY-MM-DD") : getNearestDayOfWeek(add7Days, 3).format("YYYY-MM-DD")
	const thursday = getNearestDayOfWeek(currDate, 4).format("YYYY-MM-DD")  >= currDate ? getNearestDayOfWeek(currDate, 4).format("YYYY-MM-DD") : getNearestDayOfWeek(add7Days, 4).format("YYYY-MM-DD")
	const friday = getNearestDayOfWeek(currDate, 5).format("YYYY-MM-DD")  >= currDate ? getNearestDayOfWeek(currDate, 5).format("YYYY-MM-DD") : getNearestDayOfWeek(add7Days, 5).format("YYYY-MM-DD")
	const saturday = getNearestDayOfWeek(currDate, 6).format("YYYY-MM-DD")  >= currDate ? getNearestDayOfWeek(currDate, 6).format("YYYY-MM-DD") : getNearestDayOfWeek(add7Days, 6).format("YYYY-MM-DD")
	const sunday = getNearestDayOfWeek(currDate, 7).format("YYYY-MM-DD")  >= currDate ? getNearestDayOfWeek(currDate, 7).format("YYYY-MM-DD") : getNearestDayOfWeek(add7Days, 7).format("YYYY-MM-DD")
	const dateMap = {
		1: sunday,
		2: monday,
		3: tuesday,
		4: wednesday,
		5: thursday,
		6: friday,
		7: saturday
	}
	return (
		<div>
			{/* {sessions} */}
			<Card>
				<CardContent>
					<div className="user-profile">
						<Avatar
							src={"https://i.imgur.com/3lAqhmi.jpg"}
							style={avatarStyle}
						></Avatar>
						<div>
							<h1>Connected user: Bob</h1>
							<p>Date: 6/20/2020</p>
							<p>Time: 6:30PM</p>
						</div>
					</div>

					<Button variant="contained" className="btn btn-primary pull-right">
						Select
					</Button>
				</CardContent>
			</Card>
			<br></br>
			<br></br>
			<Card>
				<CardContent>
					<div className="user-profile">
						<Avatar
							src={"https://i.imgur.com/3lAqhmi.jpg"}
							style={avatarStyle}
						></Avatar>
						<div>
							<h1>Connected user: Jake</h1>
							<p>Date: 6/21/2020</p>
							<p>Time: 11:00AM</p>
						</div>
					</div>

					<Button variant="contained" className="btn btn-primary pull-right">
						Select
					</Button>
				</CardContent>
			</Card>
			<br></br>
			<br></br>
			<Card>
				<CardContent>
					<div className="user-profile">
						<Avatar
							src={
								"https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
							}
							style={avatarStyle}
						></Avatar>
						<div>
							<h1>Connected user: Tom</h1>
							<p>Date: 6/22/2020</p>
							<p>Time: 3:00PM</p>
						</div>
					</div>

					<Button variant="contained" className="btn btn-primary pull-right">
						Select
					</Button>
				</CardContent>
			</Card>
			<br></br>
			<br></br>
			<Card>
				<CardContent>
					<div className="user-profile">
						<Avatar
							src={
								"https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
							}
							style={avatarStyle}
						></Avatar>
						<div>
							<h1>Connected user: Chris</h1>
							<p>Date: 6/27/2020</p>
							<p>Time: 9:00AM</p>
						</div>
					</div>

					<Button variant="contained" className="btn btn-primary pull-right">
						Select
					</Button>
				</CardContent>
			</Card>
		</div>
	);
};

export default PotentialSessionsView;

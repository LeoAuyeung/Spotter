import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const avatarStyle = {
	width: "100px",
	height: "100px",
	marginRight: "30px",
};

const PotentialSessionsView = (props) => {
	const { sessions } = props;
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

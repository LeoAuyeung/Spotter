import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";

export default function FormDialog() {
	const [open, setOpen] = React.useState(false);
	const [workouts] = React.useState([
		"Bench Press",
		"Push Ups",
		"Running (treadmill)",
	]);
	const [measurements] = React.useState([
		"Pounds (lb)",
		"Reps",
		"Time (min)",
		"Distance (mi)",
	]);
	const [workout, setWorkout] = React.useState("");
	const [measurement, setMeasurement] = React.useState("");
	const [amount, setAmount] = React.useState(0);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = async (e) => {
		// this is only if the user deletes the initial properties and leaves fields blank
		// Its okay if save changes is clicked and nothing actually changed
		e.preventDefault();

		// send changed user data
		let changedWorkout = {
			// NOT changed but need it for Link
			workout: workout,
			amount: amount,
			measurement: measurement,
		};

		// send to edit User to update User AND the database
		console.log(changedWorkout);
	};

	addWorkout = async (userId, workoutId, volumeId, maxNumber) => {
		const headers = {
			authorization: localStorage.token,
		};

		const body = {
			userId,
			workoutId,
			volumeId,
			maxNumber,
		};

		await axios.post(`/api/userWorkoutVolumes`, body, {
			headers: headers,
		});

		this.props.history.goBack();
	};

	return (
		<div>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Add Workout
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Add a new workout</DialogTitle>
				<form onSubmit={handleSubmit}>
					<DialogContent>
						<DialogContentText>Select your workout</DialogContentText>
						<Select
							name="workout"
							value={workout}
							input={<Input />}
							onChange={(e) => setWorkout(e.target.value)}
						>
							{workouts.map((workout, index) => (
								<MenuItem key={index} value={workout}>
									{workout}
								</MenuItem>
							))}
						</Select>
					</DialogContent>
					<DialogContent>
						<DialogContentText>Enter the weight</DialogContentText>
						<TextField
							name="amount"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
						></TextField>
					</DialogContent>
					<DialogContent>
						<DialogContentText>
							Select your unit of measurement
						</DialogContentText>
						<Select
							name="measurement"
							value={measurement}
							input={<Input />}
							onChange={(e) => setMeasurement(e.target.value)}
						>
							{measurements.map((measurement, index) => (
								<MenuItem key={index} value={measurement}>
									{measurement}
								</MenuItem>
							))}
						</Select>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={handleClose} color="primary" type="submit">
							Add
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}

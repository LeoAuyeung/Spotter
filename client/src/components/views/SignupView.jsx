import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';


import { makeStyles } from "@material-ui/core/styles";

const SignupView = (props) => {
	function Copyright() {
		return (
			<Typography variant="body2" color="textSecondary" align="center">
				{"Copyright © "}
				<Link color="inherit" href="https://material-ui.com/">
					Spotter 2020
				</Link>{" "}
				{"."}
			</Typography>
		);
	}

	const useStyles = makeStyles((theme) => ({
		root: {
			height: "100vh",
		},
		form: {
			width: "100%", // Fix IE 11 issue.
			marginTop: theme.spacing(1),
		},
		submit: {
			margin: theme.spacing(3, 0, 2),
		},
	}));

	const classes = useStyles();
	const {
		handleSubmit,
		handleChange,
		firstName,
		lastName,
		email,
		password,
		birthday,
		gender
	} = props;

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								name="firstName"
								variant="outlined"
								required
								fullWidth
								label="First Name"
								autoFocus
								onChange={handleChange}
								value={firstName}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								autoComplete="lname"
								onChange={handleChange}
								value={lastName}
							/>
						</Grid>
						<Grid container spacing ={2}>
						<Grid Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								fullWidth
								id="date"
								label="Birthday"
								name="birthday"
								type="date"
								onChange={handleChange}
								value={birthday}
								// className={classes.textField}
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</Grid>
						<Grid Grid item xs={12} sm={6}>
							
								<InputLabel id="demo-multiple-name-label">Gender</InputLabel>
								<Select name = "gender" value = {gender} input ={<Input/>}onChange = {handleChange}>
									<MenuItem value = 'F'>Female</MenuItem>
									<MenuItem value = 'M'>Male</MenuItem>
								</Select>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={handleChange}
								value={email}
							/>
						</Grid>
						</Grid>
						
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={handleChange}
								value={password}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="/" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
};

export default SignupView;

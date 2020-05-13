import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button"
import { LinkButton } from "../utilities";

const NavbarView = (props) => {
	const useStyles = makeStyles((theme) => ({
		root: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
		},
	}));

	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const { isLoggedIn, loggedInUser, logout } = props;

	let loggedInView;
	if (isLoggedIn) {
		loggedInView = (
			<Typography variant="h6" className={classes.title}>
				<Link to="/profile" style={{ textDecoration: "none", color: "white" }}>
					
					Logged in as: {loggedInUser.email}
				</Link>
				{/* <LinkButton onClick={logout} to="/">
					Sign Out
				</LinkButton> */}
				<Button onClick={logout}><Link to = "/">Sign Out</Link></Button>
			</Typography>
		);
	}

	const loggedOutView = (
		<Typography variant="h6" className={classes.title}>
			<Button color="inherit"><Link to="/signin" style={{ textDecoration: "none", color: "white" }}>
				Sign In
			</Link></Button>
			<Button color="inherit"><Link to="/signup" style={{ textDecoration: "none", color: "white" }}>
				Sign Up
			</Link></Button>
			
		 </Typography>
	);

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
					>
						<MenuIcon
							aria-controls="simple-menu"
							aria-haspopup="true"
							onClick={handleClick}
						></MenuIcon>
						<Menu
							id="simple-menu"
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose}>
								<Link
									to="/users"
									style={{ textDecoration: "none", color: "black" }}
								>
									Users
								</Link>
							</MenuItem>
						</Menu>
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						<Link to="/" style={{ textDecoration: "none", color: "white" }}>
							Spotter
						</Link>
					</Typography>
					<Button>{isLoggedIn ? loggedInView : loggedOutView}</Button>
					
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default NavbarView;

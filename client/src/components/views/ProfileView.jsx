import React from "react";
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import "./Profile.css"

const avatarStyle= {
    width: '100px',
    height: '100px'
}
const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
  });

const ProfileView = props => {
    const {user} = props
    const classes = useStyles();


	return (
		<div >
            <div>
                <Card>
                    <CardContent>
                        <div className = "user-profile">
                            <Avatar src = {user.img} style={avatarStyle }></Avatar>
                            <div>
                                <h1>{user.name}</h1>
                                <p>{user.gender} || {user.age}</p>
                                <p>{user.desc}</p>
                            </div>
                        </div>
                        <Button variant = "contained" className= "btn btn-primary pull-right"><Link className = "profile-link" to="/edit/workout">Edit Workout</Link></Button>

                        <Button variant = "contained" className= "btn btn-primary pull-right"><Link className = "profile-link" to="/edit">Edit Profile</Link></Button>
                        <Button variant = "contained" className= "btn btn-primary pull-right">Edit Calender</Button>

                    </CardContent>
                </Card>
            </div>
            <br></br>
            <div>
                <Card>
                    <CardContent>
                        Workouts
                        <Card className={classes.root}>
                            <CardMedia
                            component="img"
                            
                            height="140"
                            
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                               
                            </Typography>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            </div>
            <br></br>

            <div>
                <Card>
                    <CardContent>
                        Stats
                    </CardContent>
                </Card>
            </div>
		</div>
	);
};

export default ProfileView;

import React from "react";
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'

import "./Profile.css"

const avatarStyle= {
    width: '100px',
    height: '100px'
}

const ProfileView = props => {
    const {user} = props


	return (
<<<<<<< HEAD
		<div>
			<h1>hello.</h1>
=======
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
>>>>>>> fe97c19fb6efde5f9d7a83ba9d101152a7995969
		</div>
	);
};

export default ProfileView;

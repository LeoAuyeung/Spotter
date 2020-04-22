import React from "react";
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import "./Profile.css"

const avatarStyle= {
    width: '100px',
    height: '100px'
}

const UserProfileView = props => {
    const {user} = props


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
                    
                        <Button variant = "contained" className= "btn btn-primary pull-right">Message</Button>
                        <Button variant = "contained" className= "btn btn-primary pull-right">Follow</Button>

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
		</div>
	);
};

export default UserProfileView;
import React from "react";
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'


const avatarStyle= {
    width: '100px',
    height: '100px'
}

const PotentialSessionsView = (props) => {
    const {sessions} = props
	return (
		<div>
            {/* {sessions} */}
            <Card>
                    <CardContent>
                        <div className = "user-profile">
                            <Avatar src = {""} style={avatarStyle }></Avatar>
                            <div>
                                <h1>Connected user: </h1>
                                <p>Date: </p>
                                <p>Time: </p>
                            </div>
                        </div>
                    
                        <Button variant = "contained" className= "btn btn-primary pull-right">Select</Button>
                    </CardContent>
                </Card>
		</div>
	);
};

export default PotentialSessionsView;
import React from "react";

const UsersView = props => {
    const {users} = props
	return (
        <div>
        {users.map(c => {
            return (
                <div>
                    <ul>
                        <li>{c.name}</li>
                    </ul>
                </div>
            );
        })}
    </div>
	
	);
};

export default UsersView;

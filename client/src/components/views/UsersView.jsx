import React from "react";
import "./Users.css"
const UsersView = props => {
    const {users, filter, handleChange, filterItems} = props
	return (
        <div>
             <div>
                    {/* <button>male</button>
                    <button>female</button> */}
                    {/* <input value ={filter} onChange = {handleChange}></input> */}
                    <select onChange={handleChange}>
                        <option value= "">No filter</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>

            </div>
        {filterItems(users).map(c => {
            return (
                   
                    <div className = "users-container">
                        {/* <ul>
                            <li>{c.name}</li>
                        </ul> */}
                        <h1>
                        <span>{c.name}</span>
                        <button class= "btn btn-primary pull-right">View Profile</button>
                        </h1>
                    
                    </div>


               
            );
        })}
    </div>
	
	);
};

export default UsersView;

import React from "react";
import { Link } from "react-router-dom";
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
                        <img src={c.img} className = "profile-img"></img>
                        <span>{c.name}</span>
                        <Link to = {"/profile/"+c.name}>
                            <button className= "btn btn-primary pull-right">View Profile</button>
                        </Link>
                        </h1>
                    
                    </div>


               
            );
        })}
    </div>
	
	);
};

export default UsersView;

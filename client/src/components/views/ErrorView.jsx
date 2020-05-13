import React from "react";
import { Link } from "react-router-dom";
import "./Error.css"
const ErrorView = (props) => {
	return(
        <div>
            <div className="face">
                        <div className="band">
                            <div className="red"></div>
                            <div className="white"></div>
                            <div className="blue"></div>
                        </div>
                        <div className="eyes"></div>
                        <div className="dimples"></div>
                        <div className="mouth"></div>
                    </div>

            <h1 className = "error-title">Oops! Something went wrong!</h1>
            <div className="btn"><Link to="/" className = "error-link">Return to Home</Link></div>
        </div>
       
    );
};

export default ErrorView;

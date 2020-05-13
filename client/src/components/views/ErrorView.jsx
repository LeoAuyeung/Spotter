import React from "react";
import { Link } from "react-router-dom";
import "./Error.css"
const ErrorView = (props) => {
	return(
        <div className = "error-page">
            <div class="face">
                        <div class="band">
                            <div class="red"></div>
                            <div class="white"></div>
                            <div class="blue"></div>
                        </div>
                        <div class="eyes"></div>
                        <div class="dimples"></div>
                        <div class="mouth"></div>
                    </div>

            <h1 className = "error-title">Oops! Something went wrong!</h1>
            <div className="btn"><Link to="/" className = "error-link">Return to Home</Link></div>
        </div>
       
    );
};

export default ErrorView;

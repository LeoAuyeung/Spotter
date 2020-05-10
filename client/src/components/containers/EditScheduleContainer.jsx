import React, { Component } from "react";
import { connect } from "react-redux";
import { EditScheduleView } from "../views";



class EditScheduleContainer extends Component {
	constructor(props){
        super(props);
        this.state ={
            columns: [{ name: "day", title: "Day" },
            { name: "startTime", title: "Start Time" },
            { name: "endTime", title: "EndTime" }],
 

        }
    }



	render() {
        return <EditScheduleView 
        rows = {this.state.rows}
        columns = {this.state.columns}
		
		/>;
		
	}
}

export default connect(null, null)(EditScheduleContainer);

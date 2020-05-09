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
            rows: 1,
            setRows: []

        }
        this.commitChanges = this.commitChanges.bind(this)
        // this.getRowId = this.getRowId.bind(this)
    }

    // getRowId = (row) => {row.id};

   commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
        if (added) {
        const startingAddedId =
            this.state.rows.length > 0 ? this.state.rows[this.state.rows.length - 1].id + 1 : 0;
        changedRows = [
            ...this.state.rows,
            ...added.map((row, index) => ({
            id: startingAddedId + index,
            ...row
            }))
        ];
        }
        if (changed) {
        changedRows = this.state.rows.map(row =>
            changed[row.id] ? { ...row, ...changed[row.id] } : row
        );
        }
        if (deleted) {
        const deletedSet = new Set(deleted);
        changedRows = this.state.rows.filter(row => !deletedSet.has(row.id));
        }
        this.state.setRows(changedRows)

    }



	render() {
        return <EditScheduleView 
        rows = {this.state.rows}
        columns = {this.state.columns}
        // getRowId = {this.getRowId}
        commitChanges = {this.commitChanges}

		
		/>;
		
	}
}

export default connect(null, null)(EditScheduleContainer);

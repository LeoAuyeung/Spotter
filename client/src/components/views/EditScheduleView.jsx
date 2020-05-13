import React from "react";
// import Paper from "@material-ui/core/Paper";
// import { EditingState } from "@devexpress/dx-react-grid";
// import {
//   Grid,
//   Table,
//   TableHeaderRow,
//   TableEditRow,
//   TableEditColumn
// } from "@devexpress/dx-react-grid-material-ui";
import MaterialTable from "material-table";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";

const EditScheduleView = (props) => {
	const { rows, columns, getRowId, commitChanges } = props;
	const [state, setState] = React.useState({
		columns: [
			{ title: "Day", field: "day" },
			{ title: "Start Time", field: "startTime" },
			{ title: "End Time", field: "endTime" },
		],
		data: [
			{
				id: 2,
				day: "Monday",
				startTime: "11:00AM",
				endTime: "12:00PM",
			},
			{
				id: 3,
				day: "Tuesday",
				startTime: "1:00PM",
				endTime: "2:00PM",
			},
			{
				id: 4,
				day: "Thursday",
				startTime: "9:00AM",
				endTime: "11:00AM",
			},
			{
				id: 5,
				day: "Friday",
				startTime: "11:00AM",
				endTime: "12:00PM",
			},
		],
	});
	return (
		<MaterialTable
			title="Edit your schedule"
			columns={state.columns}
			data={state.data}
			editable={{
				onRowAdd: (newData) =>
					new Promise((resolve) => {
						setTimeout(() => {
							resolve();
							setState((prevState) => {
								const data = [...prevState.data];
								data.push(newData);
								return { ...prevState, data };
							});
						}, 600);
					}),
				onRowUpdate: (newData, oldData) =>
					new Promise((resolve) => {
						setTimeout(() => {
							resolve();
							if (oldData) {
								setState((prevState) => {
									const data = [...prevState.data];
									data[data.indexOf(oldData)] = newData;
									return { ...prevState, data };
								});
							}
						}, 600);
					}),
				onRowDelete: (oldData) =>
					new Promise((resolve) => {
						setTimeout(() => {
							resolve();
							setState((prevState) => {
								const data = [...prevState.data];
								data.splice(data.indexOf(oldData), 1);
								return { ...prevState, data };
							});
						}, 600);
					}),
			}}
		/>
	);
};

export default EditScheduleView;

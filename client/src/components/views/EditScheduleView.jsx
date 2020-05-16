import React from "react";

import MaterialTable from "material-table";

const EditScheduleView = (props) => {
	const {
		schedules,
		handleCreateSchedule,
		handleEditSchedule,
		handleDeleteSchedule,
	} = props;

	const [state, setState] = React.useState({
		columns: [
			{ title: "ID", field: "id" },
			{ title: "Day", field: "day" },
			{ title: "Start Time", field: "startTime" },
			{ title: "End Time", field: "endTime" },
		],
		data: schedules,
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
							handleCreateSchedule(newData);
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
								handleEditSchedule(oldData.id, newData);
								setState((prevState) => {
									const data = [...prevState.data];
									const dataNoID = {
										id: oldData.id,
										day: newData.day,
										startTime: newData.startTime,
										endTime: newData.endTime,
									};

									data[data.indexOf(oldData)] = dataNoID;
									return { ...prevState, data };
								});
							}
						}, 600);
					}),
				onRowDelete: (oldData) =>
					new Promise((resolve) => {
						setTimeout(() => {
							resolve();
							handleDeleteSchedule(oldData.id);
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

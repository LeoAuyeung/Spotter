import React, { Component } from "react";
import { connect } from "react-redux";
import { EditScheduleView } from "../views";

// const [columns] = useState([
//     { name: "day", title: "Day" },
//     { name: "startTime", title: "Start Time" },
//     { name: "endTime", title: "EndTime" }
//   ]);
// const defaultColumnValues = {
//     day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', "Friday", "Saturday"],
//     startTime: [
      
//     ],
//     endTime: cities,
//   };


class EditScheduleContainer extends Component {
	constructor(props){
		super(props);
    }

//     generateRows({
//         columnValues = defaultColumnValues,
//         length,
//         random = randomSeed(329972281),
//       }) {
//         const data = [];
//         const columns = Object.keys(columnValues);
      
//         for (let i = 0; i < length; i += 1) {
//           const record = {};
      
//           columns.forEach((column) => {
//             let values = columnValues[column];
      
//             if (typeof values === 'function') {
//               record[column] = values({ random, index: i, record });
//               return;
//             }
      
//             while (values.length === 2 && typeof values[1] === 'object') {
//               values = values[1][record[values[0]]];
//             }
      
//             const value = values[Math.floor(random() * values.length)];
//             if (typeof value === 'object') {
//               record[column] = { ...value };
//             } else {
//               record[column] = value;
//             }
//           });
      
//           data.push(record);
//         }
      
//         return data;
//       }
      
//      getRowId = row => row.id;

 


//    commitChanges = ({ added, changed, deleted }) => {
//     let changedRows;
//     if (added) {
//       const startingAddedId =
//         rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
//       changedRows = [
//         ...rows,
//         ...added.map((row, index) => ({
//           id: startingAddedId + index,
//           ...row
//         }))
//       ];
//     }
//     if (changed) {
//       changedRows = rows.map(row =>
//         changed[row.id] ? { ...row, ...changed[row.id] } : row
//       );
//     }
//     if (deleted) {
//       const deletedSet = new Set(deleted);
//       changedRows = rows.filter(row => !deletedSet.has(row.id));
//     }
// }

// const [rows, setRows] = useState(
//     generateRows({
//       columnValues: { id: ({ index }) => index, ...defaultColumnValues },
//       length: 0
//     })
//   );
//     setRows(changedRows)

	render() {
		return <EditScheduleView 
		
		/>;
		
	}
}

export default connect(null, null)(EditScheduleContainer);

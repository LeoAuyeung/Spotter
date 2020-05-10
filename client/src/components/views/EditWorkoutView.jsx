import React from "react";

// import { Form, Field } from 'react-final-form';
// import { TextField } from 'final-form-material-ui';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';

import {
  Paper,
  Grid,
  Button
} from '@material-ui/core';



 import AddWorkout from './AddWorkout.jsx'
const EditWorkoutView = props => {
    const {workout, workouts, measurements, handleSubmit, handleChange, amount, measurement } = props
    
	return (
        
		<div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}> 
        <div>
        
        <AddWorkout/>
      </div> 
			  <form onSubmit = {handleSubmit}>
				<Paper style={{ padding: 16 }}>
				  <Grid container alignItems="flex-start" spacing={2}>
                      <div>
                      Select the workout you want to change
                        <br></br>
                        <Select name="workout" value ={workout} input ={<Input/>}onChange = {handleChange}>
                          {workouts.map((workout, index)=>  
                          <MenuItem key={index} value={workout}>{workout}</MenuItem>)}
                           
                        </Select>
                        <br></br>
                        <TextField onChange = {handleChange} name = "amount" value = {amount} label="Enter new amount"></TextField>
                        <br></br>
                        Select the unit of measurement
                        <br></br>
                        <Select name="measurement" value ={measurement} input ={<Input/>}onChange = {handleChange}>
                          {measurements.map((measurement, index)=>  
                          <MenuItem key={index} value={measurement}>{measurement}</MenuItem>)}                        
                        </Select>
                      </div>
									 
					<Grid item style={{ marginTop: 16 }}>
					  <Button
						variant="contained"
						color="primary"
						type="submit"
					  >
						Submit
					  </Button>
					</Grid>
				  </Grid>
				</Paper>
			  </form>
		</div>
	  );
};

export default EditWorkoutView;











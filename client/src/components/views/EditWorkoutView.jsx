import React from "react";

// import { Form, Field } from 'react-final-form';
// import { TextField } from 'final-form-material-ui';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import {
  Paper,
  Grid,
  Button
} from '@material-ui/core';



 import AddWorkout from './AddWorkout.jsx'
const EditWorkoutView = props => {
    const {handleClickOpen, handleClose} = props
    // const {handleSubmit, handleChange, description} = props
    
	return (
        
		<div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}> 
        <div>
        
        <AddWorkout/>
      </div> 
			  <form >
				<Paper style={{ padding: 16 }}>
				  <Grid container alignItems="flex-start" spacing={2}>
                      <div>
                      Select the workout you want to change
                        <br></br>
                        <Select>
                            <MenuItem></MenuItem>
                        </Select>
                        <br></br>
                        <TextField label="Enter new amount"></TextField>
                        <br></br>
                        Select the unit of measurement
                        <br></br>
                        <Select>
                            <MenuItem></MenuItem>
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











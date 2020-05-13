import React from "react";

// import { Form, Field } from 'react-final-form';
// import { TextField } from 'final-form-material-ui';
import TextField from '@material-ui/core/TextField';

import {
  Paper,
  Grid,
  Button
} from '@material-ui/core';

const EditProfileView = props => {
	const {handleSubmit, handleChange, description} = props
	return (
		<div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>     
			  <form onSubmit={handleSubmit}>
				<Paper style={{ padding: 16 }}>
				  <Grid container alignItems="flex-start" spacing={2}>
					
	
					<Grid item xs={12}>
						<TextField
							id="standard-helperText"
							label="Description"
							helperText="Change your description"
							onChange = {handleChange}
							name = "description"
							value = {description}

							/>
					</Grid>
					 
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

export default EditProfileView;











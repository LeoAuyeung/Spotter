import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const workouts =  ["deadlifts", "bench press", "squat"]
  const measurements =  ["lbs", "bodyweight"]
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async(e) => {
		// this is only if the user deletes the initial properties and leaves fields blank
		// Its okay if save changes is clicked and nothing actually changed
		e.preventDefault();
		
		  // send changed user data
		  let changedWorkout = {
			// NOT changed but need it for Link
			workout: this.state.workout,
			amount: this.state.amount,
			measurement: this.state.measurement
		  };
	
		  // send to edit User to update User AND the database
		  console.log(changedWorkout)
	  };
    
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Workout
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a new workout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select your workout
          </DialogContentText>
         <Select>
         {workouts.map((workout, index)=>  
            <MenuItem key={index} value={workout}>{workout}</MenuItem>)}
         </Select>
        </DialogContent>
        <DialogContent>
          <DialogContentText>
            Enter the weight
          </DialogContentText>
         <TextField></TextField>
        </DialogContent>
        <DialogContent>
          <DialogContentText>
            Select your unit of measurement
          </DialogContentText>
         <Select>
         {measurements.map((measurement, index)=>  
            <MenuItem key={index} value={measurement}>{measurement}</MenuItem>)} 
         </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import React, { useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: theme.spacing(0)
  },
  button: {
    margin: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const AddHouse = props => {
  const classes = useStyles();
  const [name, setName] = useState("");

  const handleChange = event => setName(event.target.value);

  const submit = e => {
    e.preventDefault();
    const data = { name: name }
    axios.post("/api/houses/create", data).then(props.update()).catch(res => console.log(res.data));
  }
  
  return (
    <div className={classes.root} >
      <form className={classes.container} noValidate onSubmit={submit}>
        <TextField
          id="HouseName"
          label="Name"
          value={name}
          className={classes.textField}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />   
        <Button variant="contained" className={classes.button} disabled={name.length === 0 ? true : false} type="submit" onClick={props.close}>
          Create House
        </Button>
      </form>
    </div>
  );
}

export default AddHouse;
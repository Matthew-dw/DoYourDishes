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
}));

const JoinHouse = props => {
  const classes = useStyles();
  const [id, setId] = useState("");

  const handleChange = event => setId(event.target.value);

  const submit = e => {
    e.preventDefault();
    axios.post("/api/houses/" + id).then(props.update()).catch(res => console.log(res.data));
  }
  return (
    <div className={classes.root} >
      <form className={classes.container} noValidate onSubmit={submit}>
        <TextField
          id="HouseLink"
          label="Link"
          value={id}
          className={classes.textField}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />   
        <Button variant="contained" className={classes.button} disabled={id.length !== 24 ? true : false} type="submit" onClick={props.close}>
          Join House
        </Button>
      </form>
    </div>
  );
}

export default JoinHouse;
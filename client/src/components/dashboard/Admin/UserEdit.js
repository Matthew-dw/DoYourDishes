import React, { useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: theme.spacing(0)
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '50px',
        alignItems: 'center',
    },
    button: {
        margin: theme.spacing(1),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    colorCircle: {
        height: "15px",
        width: "15px",
        borderRadius: "50%",
        padding: '2.5px',
        marginRight: "10px",
        boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)",
        '&:hover': {
            boxShadow: "0px 1px 3px 0px rgba(0,0,0,1), 0px 1px 1px 0px rgba(0,0,0,1), 0px 2px 1px -1px rgba(0,0,0,1)",
            cursor: 'pointer',
        }, 
    },
    activeColorCircle: {
        height: "15px",
        width: "15px",
        borderRadius: "50%",
        padding: '2.5px',
        marginRight: "10px",
        boxShadow: "0px 1px 3px 0px rgba(0,0,0,1), 0px 1px 1px 0px rgba(0,0,0,1), 0px 2px 1px -1px rgba(0,0,0,1)",
        '&:hover': {
            cursor: 'pointer',
        }, 
    }
}));

const colors1 = ['#7FDBFF', '#39CCCC', '#3D9970', '#2ECC40', '#01FF70'];
const colors2 = ['#FFDC00', '#FF851B', '#FF4136', '#B10DC9', '#F012BE'];

const UserEdit = props => {
  const classes = useStyles();
  const house = props.house;
  const index = props.index;

  const [name, setName] = useState(house.nicknames[index].nickname);
  const [userColor, setUserColor] = useState(house.nicknames[index].color)
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    setOpen(false);
    const data = {
        nickname: name,
        color: userColor,
        index: index,
    }
    axios.post("/api/houses/" + house._id + "/edituser", data)
            .then(() => props.update());
  }

  const handleChange = event => setName(event.target.value);

  return (
    <div className={classes.root} >
      <Button color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Select a color and nickname
            </DialogContentText>
                <div className={classes.row}>
                    {colors1.map(color => 
                        <div key={color}
                        className={userColor !== color ? classes.colorCircle : classes.activeColorCircle} 
                        style={{backgroundColor: color}}
                        onClick={() => setUserColor(color)}
                        /> 
                    )}
                </div>
                <div className={classes.row}>
                    {colors2.map(color => 
                        <div key={color}
                        className={userColor !== color ? classes.colorCircle : classes.activeColorCircle} 
                        style={{backgroundColor: color}}
                        onClick={() => setUserColor(color)}
                        /> 
                    )}
                </div>
                <TextField
                id="Nickname"
                label="Nickname"
                value={name}
                className={classes.textField}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserEdit;
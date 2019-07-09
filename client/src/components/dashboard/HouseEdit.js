import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

import UserEdit from './UserEdit'

// Material Components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
        margin: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
    },
    scroll: {
        height: 'calc(100vh - 112px)',
        overflowY: 'scroll',
        scrollbarWidth: '10px',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        height: '56px',
        width: '178px',
        float: 'bottom',
    },
    popover: {
        padding: theme.spacing(2),
    }
}));

const HouseEdit = props => {
    const house = props.house;
    const classes = useStyles();
    
    const [name, setName] = useState(house.name);
    const [anchorEl, setAnchorEl] = useState(false);
    const userIndex = house.users.findIndex(user => user === props.auth.user.email);
    
    const handleNameChange = event => setName(event.target.value);
    const handleDeleteClick = e => setAnchorEl(e.currentTarget);
    const handleDeleteCancel = e => setAnchorEl(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : null;

    useEffect(() => {
        setName(props.house.name);
    }, [props]);



    // USER ACTIONS 

    const updateName = e => {
        e.preventDefault();
        const data = { name: name };
        axios.post("/api/houses/" + house._id + "/updatename", data).then(() => props.update());
    }


    const deleteHouse = () => {
        axios.delete("/api/houses/" + house._id)
            .then(() => {
                props.reset();
                props.update();
            });
    }

    const leaveHouse = () => {
        removeUser(userIndex);
        props.reset();
    }

    const acceptUser = index => {
        axios.post("/api/houses/" + house._id + "/acceptuser", {index: index})
            .then(() => props.update());
    }

    const rejectUser = index => {
        axios.post("/api/houses/" + house._id + "/rejectuser", {index: index})
            .then(() => props.update());
    }

    const removeUser = index => {
        axios.post("/api/houses/" + house._id + "/removeuser", {index: index})
            .then(() => props.update());
    }

    const popper = (
        <div className={classes.popover}>
            <Button onClick={handleDeleteCancel} color="primary" > Cancel</Button>
            <Button onClick={deleteHouse} color="secondary" > Delete</Button>
        </div>
    )

    return (
        <div className={classes.scroll}>

        {/** Edit House */}

        <Paper className={classes.root}>
            <div className={classes.header}>
                <Typography variant="h5">
                    House Info
                </Typography>
            </div>
            <form noValidate onSubmit={updateName}>
            <div className={classes.row}>
            <TextField
            id="HouseName"
            label="Name"
            value={name}
            className={classes.textField}
            onChange={handleNameChange}
            margin="normal"
            />            
            
            <Button variant="outlined" color="secondary" className={classes.button} onClick={handleDeleteClick}>
            Delete House
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleDeleteCancel}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
            >
                {popper}
            </Popover>
            </div>
            <div className={classes.row}>
                <Button variant="outlined" className={classes.button} disabled={name.length === 0 ? true : false} type="submit">
                Update Name
                </Button>
                <Button variant="outlined" className={classes.button} onClick={() => leaveHouse("meme")}>
                Leave House
                </Button>
            </div>
            </form>
        </Paper>

        {/** User List */}

        <Paper className={classes.root}>
            <div className={classes.row}>
                <Typography variant="h5">
                    Users
                </Typography>
                <TextField
                    id="Invite"
                    label="House Invite link"
                    value={house._id}
                />
                
            </div>
            <List>
                {house.users.map((user, index) => {
                const colorCircle = {
                    backgroundColor: house.nicknames[index].color,
                    height: "15px",
                    width: "15px",
                    borderRadius: "50%",
                    marginRight: "10px",
                    boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.8), 0px 1px 1px 0px rgba(0,0,0,0.5), 0px 2px 1px -1px rgba(0,0,0,0.4)",
                };
                return (
                    <div key={user}>
                        <ListItem>
                        <div style={colorCircle}/>
                        <ListItemText primary={house.nicknames[index].nickname.length === 0 ? user : house.nicknames[index].nickname} />
                        {index !== userIndex && <Button onClick={() => removeUser(index)} color='secondary'> Kick </Button>}
                        <UserEdit update={props.update} index={index} house={props.house} />
                        </ListItem>
                    </div>
                )})}
            </List>
        </Paper>

        {/** Pending User List */}

        {house.pending.length !== 0 && <Paper className={classes.root} >
            <div className={classes.row}>
                <Typography variant="h5">
                    Pending Users
                </Typography>
            </div>
            <List>
                {house.pending.map((user, index) => (
                    <div key={user}>
                        <ListItem>
                        <ListItemText primary={user} />
                        <Button onClick={() => acceptUser(index)}> Accept </Button>
                        <Button onClick={() => rejectUser(index)}> Reject </Button>
                        </ListItem>
                    </div>
                ))}
            </List>
        </Paper>}
        </div>
    )
}
export default HouseEdit;

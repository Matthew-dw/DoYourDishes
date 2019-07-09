import React, { useState } from 'react';
import axios from 'axios';

// Material
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { Hidden } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    row: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
    col: {
        display: 'flex',
        flexDirection: 'column'
    },
    field: {
        minWidth: 180,
        margin: theme.spacing(1),
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        height: 19,
    },
    button: {
        width: 180,
        margin: theme.spacing(1),
    },
    form: {
        background: theme.palette.grey,
        margin: theme.spacing(1),
    },
}));
    
const NewChoreForm = props => {
    // Theme
    const classes = useStyles();
    const house = props.house;
    const names = house.users;

    // State
    const [name, setName] = useState("");
    const [start, setStart] = useState(new Date());
    const [interval, setInterval] = useState();
    const [users, setUsers] = useState([]);

    // Submit function
    const submit = e => {
        e.preventDefault();
        let userIndex = [];
        for (let user of users) userIndex.push(names.indexOf(user));
        const choreData = {
            name: name,
            start: start,
            interval: interval.toString(),
            userIndex: userIndex,
        };
        axios.post("/api/houses/" + house._id + "/addchore", choreData)
            .then(() => {
                props.update();
                props.close();
            })
            .catch(res => console.log(res.data))
    }
    // Validate function
    const valid = () => {
        let valid = true;
        if (name.length === 0) valid = false;
        if (users.length === 0) valid = false;
        return valid;
    }
    // Name to nickname 
    const nickname = (name, index) => house.nicknames[index].nickname.length === 0 ? name : house.nicknames[index].nickname;

    return (
        <form className={classes.col && classes.form} noValidate onSubmit={submit}>
        <Hidden xsDown className={classes.row}>
            <TextField
            id="name"
            label="Chore Name"
            value={name}
            className={classes.field}
            onChange={e => setName(e.target.value)}
            margin="normal"
            />
            <TextField
            id="start"
            label="Start date"
            type="date"
            value={start}
            className={classes.field}
            InputLabelProps={{
                shrink: true,
            }}
            onChange={e => setStart(e.target.value)}
            />
            <TextField
            id="interval"
            label="Interval"
            value={interval}
            className={classes.field}
            onChange={e => setInterval(e.target.value)}
            />
            <FormControl className={classes.field}>
                <InputLabel htmlFor="select-multiple-checkbox">Users</InputLabel>
                <Select
                multiple
                className={classes.multipleSelect}
                value={users}
                onChange={e => setUsers(e.target.value)}
                renderValue={selected => (
                    <div className={classes.chips}>
                    {selected.map((value, index) => (
                        <Chip key={value} label={nickname(value, index)} className={classes.chip} />
                    ))}
                    </div>
                )}
                >
                    {names.map((name, index) => (
                        <MenuItem key={name} value={name} >
                        {nickname(name, index)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Hidden>
        <Hidden smUp>
            <div className={classes.row}>
                <TextField
                id="name"
                label="Chore Name"
                value={name}
                className={classes.field}
                onChange={e => setName(e.target.value)}
                margin="normal"
                />
                <TextField
                id="start"
                label="Start date"
                type="date"
                value={start}
                className={classes.field}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={e => setStart(e.target.value)}
                />
            </div>
            <div className={classes.row}>
                <TextField
                id="interval"
                label="Interval"
                value={interval}
                className={classes.field}
                onChange={e => setInterval(e.target.value)}
                />
                <FormControl className={classes.field}>
                    <InputLabel htmlFor="select-multiple-checkbox">Users</InputLabel>
                    <Select
                    multiple
                    className={classes.multipleSelect}
                    value={users}
                    onChange={e => setUsers(e.target.value)}
                    renderValue={selected => (
                        <div className={classes.chips}>
                            {selected.map((value, index) => (
                                <Chip key={value} label={nickname(value, index)} className={classes.chip} />
                            ))}
                        </div>
                    )}
                    >
                    {names.map((name, index) => (
                        <MenuItem key={name} value={name} >
                        {nickname(name, index)}
                        </MenuItem>
                    ))}
                </Select>
                </FormControl>
            </div>
        </Hidden>
        <div className={classes.row}>
        <Button variant="contained" className={classes.button} disabled={!valid()} color="primary" type="submit" >
          Submit
        </Button>
        <Button variant="contained" className={classes.button} onClick={props.close}>
          Cancel
        </Button>
        </div>
      </form>
    )
}
export default NewChoreForm;

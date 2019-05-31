import React, { useState, useEffect } from 'react';

// Material
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
        margin: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

const EditHouse = props => {
    const house = props.house;
    const classes = useStyles();
    const [name, setName] = useState(house.name);
    const [invite, setInvite] = useState(true);
    const handleChange = event => setName(event.target.value);

    useEffect(() => {
        setName(props.house.name);
    }, [props]);

    return (
        <div>
        <Paper className={classes.root}>
            <div className={classes.header}>
                <Typography variant="h5">
                    House Info
                </Typography>
            </div>
            <form noValidate onSubmit={() => console.log(0)}>
            <TextField
            id="HouseName"
            label="Name"
            value={name}
            className={classes.textField}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            />
            <br />
            <Button variant="outlined" className={classes.button} disabled={name.length === 0 ? true : false} type="submit" onClick={props.close}>
            Update
            </Button>
            </form>
        </Paper>
        <Paper className={classes.root}>
            <div className={classes.header}>
                <Typography variant="h5">
                    Users
                </Typography>
                {invite 
                    ? 
                    <IconButton variant='primary' onClick={() => setInvite(!invite)}>
                        <AddIcon />
                    </IconButton>
                    :
                    <TextField
                    id="Invite"
                    label="House Invite link"
                    value={house._id}
                    />
                }
                
            </div>
            <List>
                {house.users.map(user => (
                    <div key={user}>
                        <ListItem button>
                        <ListItemText primary={user} />
                        </ListItem>
                    </div>
                ))}
            </List>
        </Paper>
        </div>
    )
}
export default EditHouse;

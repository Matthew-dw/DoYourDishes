import React from 'react';

// Material
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { Hidden } from '@material-ui/core';
// Icons
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    paper: {
        margin: theme.spacing(4),
        padding: theme.spacing(4),
    },
}));

const Overview = props => {
    const house = props.house;
    const classes = useStyles();
    const date = new Date();
    const userIndex = house.users.findIndex(user => user === props.auth.user.email);
    


    return (
        <div>
            <Paper className={classes.paper}>
                <Typography variant="h5">
                    Weekly Overview
                </Typography>
            </Paper>

            <Paper className={classes.paper}>
                <Typography variant="h5">
                        Your Chores
                </Typography>
                <List>
                    {house.chores.map(chore => {
                        if (!chore.userIndex.includes(userIndex)) return null;
                        return (
                            <div key={chore}>
                                <ListItem>
                                <ListItemText primary={chore.name} />
                                </ListItem>
                            </div>
                    )})}
                </List>
            </Paper>
        </div>
    )
}
export default Overview;

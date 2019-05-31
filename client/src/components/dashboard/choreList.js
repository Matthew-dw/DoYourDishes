import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Material
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Clear';

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
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const ChoreList = props => {
    const house = props.house;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [chores, setChores] = React.useState([]);

    const handleAdd = () => setOpen(!open);
    const submit = () => {

    }

    const newChore = (
        <div> hello </div>
    )

    return (
        <div>
        <Paper className={classes.root}>
            <div className={classes.header}>
                <Typography variant="h5">
                    Chores
                </Typography>
                {open 
                    ?   <IconButton>
                        <RemoveIcon onClick={handleAdd} className={classes.add}/>
                        </IconButton>
                    :   <IconButton>
                        <AddIcon onClick={handleAdd} className={classes.add}/>
                        </IconButton>
                }
                
            </div>
            {open && newChore}
            <List
            component="nav"
            subheader={<ListSubheader component="div">Chore List</ListSubheader>}
            className={classes.list}
            >
                {house.chores.map((chore, index) => (
                <ListItem button 
                key={chore.name} 
                className={classes.nested} 
                >
                    <ListItemText primary={chore.name} />
                </ListItem>
                ))}
            </List>
        </Paper>
        </div>
    )
}
export default ChoreList;

import React from 'react';

// Components
import NewChoreForm from './ChoreNew';

// Material
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// Icons
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

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
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
}));



const ChoreList = props => {
    const house = props.house;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleAdd = () => setOpen(!open);
    const handleDelete = i => axios.post("/api/houses/" + house._id + "/removechore", {index: i}).then(props.update())
    const usersToString = (userIndex) => {
        let str = "";
        for (let i of userIndex) str += (house.nicknames[i].nickname.length === 0 ? house.users[i] : house.nicknames[i].nickname) + ", ";
        return str.substring(0,str.length - 2);
    }
    const intervalToString = interval => {
        switch(interval) {
            case 1: return "Daily";
            case 2: return "Every other day";
            case 7: return "Weekly";
            case 14: return "Every 2 weeks";
            case 28: return "Every 4 weeks";
            default: return interval + " days";
        }
    }
    const NewChore = () => (
        <div>
            {open && <NewChoreForm house={house} update={props.update} close={handleAdd}/>}
        </div>
    )
    return (
        <div className={classes.scroll}>
        <Paper className={classes.root}>
            <div className={classes.header}>
                <Typography variant="h5">
                    Chores
                </Typography>
                {open 
                    ?   <Tooltip title="Cancel" placement="left"><IconButton onClick={handleAdd}>
                        <RemoveIcon className={classes.add}/>
                        </IconButton></Tooltip>
                    :   <Tooltip title="Add Chore" placement="left"><IconButton onClick={handleAdd}>
                        <AddIcon className={classes.add}/>
                        </IconButton></Tooltip>
                }
                
            </div>
            <NewChore />
            <List
            component="nav"
            className={classes.list}
            >
                {house.chores.map((chore, index) => (
                <ListItem 
                key={chore.name} 
                className={classes.nested}
                >
                    <ListItemText primary={chore.name} secondary={intervalToString(chore.interval) + " starting " + chore.start.substring(0,10) + ". Performed by " + usersToString(chore.userIndex) }/>
                    <Tooltip title={"Delete " + chore.name} placement="left"><IconButton onClick={() => handleDelete(index)}>
                        <DeleteIcon className={classes.add}/>
                    </IconButton></Tooltip>
                </ListItem>
                ))}
                {house.chores.length === 0 && <Typography>Add a chore by clicking the + button in the top right!</Typography>}
            </List>
        </Paper>
        </div>
    )
}
export default ChoreList;

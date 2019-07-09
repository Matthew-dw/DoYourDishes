import React from 'react';

// Components
import HouseAdd from './HouseAdd';
import JoinHouse from './HouseJoin';

// Material
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
// Icons
import AddIcon from '@material-ui/icons/Add';
import PersonAddIcon from '@material-ui/icons/GroupAdd';

// Styles
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    nested: {
        paddingLeft: theme.spacing(4),
    },
    button: {
        margin: theme.spacing(1),
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    list: {
        padding: 0,
    },
    icon: {
        marginRight: theme.spacing(-1),
    },
}));

const DrawerContent = props => {
    const classes = useStyles();
    // add house menu state
    const [addOpen, setAddOpen] = React.useState(false);
    const handleaddClick = () => {
        setAddOpen(!addOpen);
        setJoinOpen(false);
    }
    // Join house menu state
    const [joinOpen, setJoinOpen] = React.useState(false);
    const handleJoinClick = () => {
        setJoinOpen(!joinOpen);
        setAddOpen(false);
    }
    // Render
    return (
        <div>
        <Divider />
        <List className={classes.list}>
            <ListItem>
            <ListItemText primary="Your Houses" />
            {/** Handling creation and joining into houses */}
            <ListItemIcon className={classes.icon} >
            <Tooltip title="Join House" placement="top">
                <IconButton onClick={handleJoinClick}><PersonAddIcon /></IconButton>
            </Tooltip>
            </ListItemIcon>
            <ListItemIcon className={classes.icon} >
            <Tooltip title="Add House" placement="top">
            <IconButton onClick={handleaddClick}><AddIcon /></IconButton>
            </Tooltip>
            </ListItemIcon>
            </ListItem>
            {/** Join Home form */}
            <Collapse in={joinOpen} timeout="auto" unmountOnExit>
            <JoinHouse close={handleJoinClick} update={props.update}/>
            </Collapse>
            {/** add Home form */}
            <Collapse in={addOpen} timeout="auto" unmountOnExit>
            <HouseAdd close={handleaddClick} update={props.update}/>
            </Collapse>
            {/** List of user houses */}
            <List className={classes.list}>
                <Divider />
                {props.houses.map((house, index) => (
                <ListItem button 
                key={house.name} 
                className={classes.nested} 
                onClick={e => props.setActive(index)}
                selected={props.active===index}
                >
                    <ListItemText primary={house.name} />
                </ListItem>
                ))}
            </List>
            <Divider />
        </List>
        </div>
    )
}
export default DrawerContent;
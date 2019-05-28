import React, { useEffect } from 'react';
import axios from 'axios';

// Dashboard Components
import HouseScreen from './houseScreen'
import CreateHouse from './createHouse'

// Material
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// Icons
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
        },
    },
    appBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
        display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
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
}));

const DashBoard = props => {
    // Make user log in
    useEffect(() => {
        if (!props.auth.isAuthenticated) props.history.push('/login');
    });
    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState();
    const [houses, setHouses] = React.useState([]);
    const [createOpen, setCreateOpen] = React.useState(false);
    const [houseOpen, setHouseOpen] = React.useState(true);
    const [active, setActive] = React.useState(-1);

    const handleHomesClick = () => setHouseOpen(!houseOpen);
    const handleCreateClick = () => setCreateOpen(!createOpen);
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    useEffect(() => {
        const fetchData = async () => axios.get("/api/houses/")
            .then(res => setHouses(res.data));
        fetchData();
    });

    const onLogoutClick = e => {
        e.preventDefault();
        props.logout();
        props.history.push('/login');
    }
    

    // Drawer Component
    const drawer = (
        <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
            <ListItem button onClick={handleHomesClick}>
            <ListItemIcon>
            <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Your Houses" />
            {houseOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={houseOpen} timeout="auto" unmountOnExit>
            <List>
                {houses.map((house, index) => (
                <ListItem button 
                key={house.name} 
                className={classes.nested} 
                onClick={e => setActive(index)}
                selected={active===index}
                >
                    <ListItemText primary={house.name} />
                </ListItem>
                ))}
            </List>
            </Collapse>
            <ListItem button onClick={handleCreateClick}>
            <ListItemIcon />
            <ListItemText primary="New House" />
            {createOpen ? <ExpandLess /> : <AddIcon />}
            </ListItem>
            <Collapse in={createOpen} timeout="auto" unmountOnExit>
            <CreateHouse close={handleCreateClick} />
            </Collapse>
        </List>
        </div>
    );

    const currentDisplay = () => {
        if (active === -1) return <div />
        else return <HouseScreen house={houses[active]} />
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap >
                    DoYourDishes
                </Typography>
                </Toolbar>
                <Button className={classes.button} color="inherit" onClick={onLogoutClick}>
                    Sign out
                </Button>
            </AppBar>
            <nav className={classes.drawer}>
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
                </Hidden>
            </nav>
            <div>
            <div className={classes.toolbar} />
            {currentDisplay()}
            </div>
        </div>
    );
}

export default DashBoard;
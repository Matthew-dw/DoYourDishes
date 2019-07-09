import React, { useEffect } from 'react';
import axios from 'axios';

// Dashboard Components
import HouseTabs from './HouseTabs';
import DrawerContent from './DrawerContent';

// Material
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// Icons
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 240;

// Styles
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('md')]: {
        width: '240px',
        flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },
    appBar: {
        background: "black",
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
        display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    button: {
        margin: theme.spacing(1),
    },
}));

const DashBoard = props => {
    // Style and theme
    const classes = useStyles();
    const theme = useTheme();
    const { container } = props;   
    // List of houses
    const [houses, setHouses] = React.useState([]);
    // Mobile drawer state
    const [mobileOpen, setMobileOpen] = React.useState();
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
    // Tab state
    const [active, setActive] = React.useState(-1);
    // Load Houses from database on mount, update when changed
    const [update, setUpdate] = React.useState(0);
    useEffect(() => {
        const fetchData = async () => axios.get("/api/houses/")
            .then(res => setHouses(res.data));
        fetchData();
    }, [update]);
    const shouldUpdate = () => setUpdate(update + 1);
    // Force user log in
    useEffect(() => {
        if (!props.auth.isAuthenticated) props.history.push('/');
    });

    // Logout function
    const onLogoutClick = e => {
        e.preventDefault();
        props.logout();
        props.history.push('/');
    }
    
    // Drawer Component
    const drawer = <DrawerContent houses={houses} active={active} setActive={setActive} update={shouldUpdate}/>

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
                    Do Your Dishes
                </Typography>
                </Toolbar>
                <Button className={classes.button} color="inherit" onClick={onLogoutClick}>
                    Sign out
                </Button>
            </AppBar>

            <nav className={classes.drawer}>
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden mdUp implementation="css">
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
                <Hidden smDown implementation="css">
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
            {active !== -1 ? <HouseTabs house={houses[active]} update={shouldUpdate} reset={() => setActive(-1)} auth={props.auth} /> : <div />}
        </div>
    );
}

export default DashBoard;
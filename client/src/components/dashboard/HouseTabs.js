import React from 'react';

// Components
import HouseOverview from './Overview/HouseOverview';
import ChoreList from './Chores/ChoreList';
import HouseEdit from './Admin/HouseEdit';
// Material
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles(theme => ({
  rootw: {
    flexGrow: 1,
    padding: theme.spacing(0),
    width: 'calc(100vw - 240px)',
  },
  roots: {
      flexGrow: 1,
      padding: theme.spacing(0),
      width: '100vw',
  },
  tabs: {
      width: '100%',
      color: 'white',
      background: theme.palette.background.paper,
      fontSize: theme.typography.h4,
  }, 
  toolbar: theme.mixins.toolbar,
}));
  
const HouseTabs = props => {
  var house = props.house;
    
  const classes = useStyles();
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.up('sm'));
  const [value, setValue] = React.useState(0);
  
  const handleChange = (event, newValue) => setValue(newValue);
    
  return (
    <div className={small ? classes.rootw : classes.roots}>
      <div className={classes.toolbar} />
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        justify="center"
        className={classes.tabs}
        centered
      >
        <Tab label="Overview" />
        <Tab label="Chores" />
        <Tab label="Admin " />
      </Tabs>
      {value === 0 && <div><HouseOverview house={house} update={props.update} auth={props.auth}/></div>}
      {value === 1 && <div><ChoreList house={house} update={props.update}/></div>}
      {value === 2 && <div><HouseEdit house={house} update={props.update} reset={props.reset} auth={props.auth}/></div>}
    </div>
  );
}

export default HouseTabs;

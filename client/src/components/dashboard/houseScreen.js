import React from 'react';
import ChoreList from './choreList'
import EditHouse from './editHouse'
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
      fontSize: theme.typography.h4,
  } 
}));
  
const HouseScreen = props => {
  var house = props.house;
    
  const classes = useStyles();
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.up('sm'));
  const [value, setValue] = React.useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(house);
  }
    
  return (
    <div className={small ? classes.rootw : classes.roots}>
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
        <Tab label={house.name} />
        <Tab label="Chores" />
        <Tab label="Edit House" />
      </Tabs>
      {value === 0 && <div>{house.name}</div>}
      {value === 1 && <div><ChoreList house={house}/></div>}
      {value === 2 && <div><EditHouse house={house}/></div>}
    </div>
  );
}

export default HouseScreen;

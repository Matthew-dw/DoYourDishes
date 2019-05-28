import React from 'react';
import ChoreList from './choreList'
// Material
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles(theme => ({
  rootw: {
    flexGrow: 1,
    padding: theme.spacing(1),
    width: 'calc(100vw - 240px)',
  },
  roots: {
      flexGrow: 1,
      padding: theme.spacing(1),
      width: '100vw',
  },
  tabs: {
      width: '100%',
  }
}));
  
const HouseScreen = props => {
  const house = props.house;
    
  const classes = useStyles();
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.up('sm'));
  const [value, setValue] = React.useState(0);
  
  function handleChange(event, newValue) {
    setValue(newValue);
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
      {value === 0 && <div>Item one</div>}
      {value === 1 && <div><ChoreList house={house}/></div>}
      {value === 2 && <div>Item Three</div>}
    </div>
  );
}

export default HouseScreen;

import React, { useState } from 'react';

// Material
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import { Button } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    paper: {
        margin: theme.spacing(4),
        padding: theme.spacing(4),
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dayRow: {
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'scroll',
        justifyContent: 'space-between',
    },
    day: {
        minWidth: '150px',
        height: '200px',
        margin: theme.spacing(2),
        textAlign: "center",
    },
    dayTitle: {
        padding: theme.spacing(1),
    },
    choresOnDay: {
        padding: theme.spacing(1),
    },
    choreRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
    }
}));

const addDays = (date, n) => {
    let newDate = new Date(date.getTime());
    newDate.setDate(date.getDate() + n);
    return newDate;
}

const Overview = props => {
    const house = props.house;
    const classes = useStyles();
    const userIndex = house.users.findIndex(user => user === props.auth.user.email);

    const [currentDay, setCurrentDay] = useState(new Date());
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const getChores = date => {
        let chores = [];
        for (let chore of house.chores) {
            const day = 1000*60*60*24;
            const start = new Date(chore.start)
            const diff = Math.round((date.getTime() - start.getTime()) / day) - 1;
            if (diff % chore.interval === 0) {
                console.log((diff / chore.interval) % chore.userIndex.length)
                chores.push({
                    ...chore,
                    userIndex: chore.userIndex[(diff / chore.interval) % chore.userIndex.length],
                });           
            } 
        }
        return chores;
    }

    return (
        <div>
            <Paper className={classes.paper}>
                    <Typography variant="h5">
                        Weekly Overview
                    </Typography>
                <div className={classes.row}>
                    <Button onClick={() => setCurrentDay(addDays(currentDay, -7))}> Previous Week </Button>
                    <Button onClick={() => setCurrentDay(addDays(currentDay, 7))}> Next Week </Button>
                </div>
                
                <div className={classes.dayRow}>
                    {days.map((day, index) => {
                        const daysFromToday = index - currentDay.getDay();
                        let date = new Date(currentDay.getTime());
                        date.setDate(currentDay.getDate() + daysFromToday)

                        const chores = getChores(date);
                        return (
                            <Paper key={day} 
                            className={classes.day} 
                            style={daysFromToday === 0  ? {border: '1px solid blue'} : {}}
                            onClick={() => setCurrentDay(date)}>
                                <Typography  className={classes.dayTitle}> {day} </Typography>
                                <Typography> {(date.getMonth() + 1) + "/" + date.getDate()} </Typography>
                                {chores.map(chore => (
                                    <div key={chore.name}> 
                                        <div style={{background: house.nicknames[chore.userIndex].color, marginTop: '5px'}}>
                                        <Typography>{chore.name}</Typography>
                                        </div>
                                    </div>
                                ))}
                            </Paper>
                        )
                    })}   
                </div>
            </Paper>
            <Paper className={classes.paper}>
                <div className={classes.choresOnDay}>
                    <Typography variant="h5">
                        Chores on this day
                    </Typography>
                    <div
                    component="nav"
                    className={classes.choreRow}
                    >
                        {getChores(currentDay).map(chore => (
                            <div key={chore.name} style={{marginLeft: '20px'}}> 
                                <ListItemText primary={chore.name} secondary={house.nicknames[chore.userIndex].nickname}/>
                            </div>
                        ))}
                    </div>
                </div>
            </Paper>
        </div>
    )
}
export default Overview;

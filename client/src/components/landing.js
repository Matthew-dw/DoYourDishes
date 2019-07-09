import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Login from './auth/Login';
import Register from './auth/Register';
import { withTheme } from '@material-ui/styles';
import { Paper } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        margin: 0,
    },
    half: {
        width: "50%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        width: '100%',
        textAlign: 'center',
        padding: theme.spacing(2),
        '&:hover': {
            background: '#e8f0fe',
            cursor: 'pointer',
        }
    },
    auth: {
        padding: theme.spacing(4),
        background: 'white',
    }
}));

const Landing = props => {
    const classes = useStyles();
    const [active, setActive] = useState(0);
    return (
        <body><div className={classes.root}>
        <div className={classes.half}>
        <Typography variant="h2" gutterBottom> Do Your Dishes</Typography>
        <Typography variant="h5" gutterBottom> Tired of useless roommates?</Typography>
        <Typography variant="h5" gutterBottom> Organize your home now</Typography>
        </div>
        <div>
            <Paper style={{marginTop: '20vh'}}>
                <div className={classes.row}>
                    <div className={classes.button} onClick={() => setActive(0)}>
                    <Typography component="h1" variant="h5">
                    Sign in
                    </Typography>
                    </div>
                    <div className={classes.button} onClick={() => setActive(1)}>
                    <Typography component="h1" variant="h5">
                    Register
                    </Typography>
                    </div>
                </div>
                <div className={classes.auth}>
                {active === 0 && <Login auth={props.auth} login={props.login} logout={props.logout} history={props.history} />}
                {active === 1 && <Register auth={props.auth} login={props.login} logout={props.logout}/>}
                </div>
            </Paper>
        </div>
    </div></body>
        
    )
}

export default Landing;
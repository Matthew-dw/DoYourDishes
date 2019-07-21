import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Login from './auth/Login';
import Register from './auth/Register';
import { Paper } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        margin: 0,
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
        },
    },
    half: {
        width: "50%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        [theme.breakpoints.down('md')]: {
            width: "100%",
            height: 'auto',
        },
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
    const [open, setOpen] = React.useState(false);
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    }

    return (
       <div className={classes.root}>
        <div className={classes.half}>
        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={<span id="message-id">Succesfully Registered</span>}
         />
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
                {active === 1 && <Register auth={props.auth} login={props.login} logout={props.logout} goToLogin={() => {setActive(0); setOpen(true);}}/>}
                </div>
            </Paper>
        </div>
    </div>
        
    )
}

export default Landing;
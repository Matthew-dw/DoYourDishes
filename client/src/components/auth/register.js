import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Components
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Register = props => {
    // If user is logged in push to dashboard
    useEffect(() => {
        if (props.auth.isAuthenticated) props.history.push('/dashboard');
    });
    const classes = useStyles();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });
    const [errors, setErrors] = useState({});
    const registerUser = userData => {
        axios
        .post("/api/users/register", userData)
        .then(res => props.history.push("/login"))
        .catch(err => {
            const errors = err.response.data;
            setErrors(errors);
        });
    }

    const onSubmit = e => {
        e.preventDefault();
        registerUser(userData); 
    };

    const handleChange = e => setUserData({ ...userData, [e.target.id]: e.target.value});

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={handleChange}
                helperText={errors.name}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                helperText={errors.email}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                helperText={errors.password}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password2"
                label="Password"
                type="password"
                id="password2"
                autoComplete="current-password"
                onChange={handleChange}
                helperText={errors.password2}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
            Register
            </Button>
            <Link href="/login" variant="body2">
                {"Have an account? Log in"}
            </Link>
        </form>
      </div>
    </Container>
    )
}

export default Register;
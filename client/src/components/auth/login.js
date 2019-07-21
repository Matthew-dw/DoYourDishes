import React, {useState, useEffect} from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import Validator from 'validator';

// Components
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
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

const Login = props => {
    // If user is logged in push to dashboard
    useEffect(() => {
        if (props.auth.isAuthenticated) props.history.push('/dashboard');
    });
    const classes = useStyles();
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const loginUser = () => {
        axios.post("/api/users/login", userData)
            .then(res => {
                const { token } = res.data;
                localStorage.setItem("jwtToken", token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                props.login(decoded);
            })
            .catch(err => {
                const errors = err.response.data;
                setErrors(errors);
            });
    }
    
    const valid = () => {
        const errors = {};
        if (!Validator.isEmail(userData.email))  errors.email = "Email is invalid";
        if (userData.email.length === 0)         errors.email = "Email field is required";
        if (userData.email.password === 0)       errors.password = "Password field is required";
        if (errors === {}) return true;
        return false;
    }
    const onSubmit = e => {
        e.preventDefault();
        valid();
        loginUser();
    };

    const handleChange = e => setUserData({ ...userData, [e.target.id]: e.target.value});

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                autoFocus
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
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
            Sign In
            </Button>
        </form>
      </div>
    </Container>
    )
}

export default Login;

import React from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";

// Components
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';

// CSS
import '../../css/auth.css'


class Login extends React.Component {
    state = {
        email: "",
        password: "",
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) this.props.history.push("/dashboard");
    }

    loginUser(userData) {
        axios.post("/api/users/login", userData)
            .then(res => {
                const { token } = res.data;
                localStorage.setItem("jwtToken", token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                this.props.login(decoded);
            })
            .catch(err => {
                if (err.response) {
                    let errors = err.response.data;
                    this.setState({ errors })
                }
            });
    }
    
    onChange = e => this.setState({ [e.target.id]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.loginUser(userData);
    };

    render() {
        return(
            <Container maxWidth="sm" className='auth-container'>
                <div className='auth-header'>
                    <Typography className='login-login' variant="h3" align="center" gutterBottom > Log in Below </Typography>
                    <Typography className='login-text' align="center" gutterBottom > Don't have an Account?   <Link className='login-text' to='/register'> Register here </Link> </Typography>
                </div>
                
                <form noValidate onSubmit={this.onSubmit} className='auth-form'>
                    <FormControl className="auth-form-input">
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                        id="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        aria-describedby="email"
                        />
                        <FormHelperText error id="email-error">{this.state.errors.email}</FormHelperText>
                    </FormControl>
                    <FormControl className="auth-form-input">
                        <InputLabel htmlFor="component-error">Password</InputLabel>
                        <Input
                        id="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        aria-describedby="password"
                        />
                        <FormHelperText error id="password-error">{this.state.errors.password || this.state.errors.passwordincorrect}</FormHelperText>
                    </FormControl>
                    <Button
                    variant="contained" 
                    color="primary"
                    type="submit"
                    className="login-button"
                    >
                    Log in
                    </Button>
                </form>
            </Container>
        )
    }
}

export default Login;
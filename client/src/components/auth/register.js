import React from 'react';
import axios from 'axios';

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

class Register extends React.Component {
    state = {
        name: "",
        email: "",
        password: "",
        password2: "",
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) this.props.history.push("/dashboard");
    }

    onChange = e => this.setState({ [e.target.id]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.registerUser(newUser); 
    };


    registerUser(userData) {
        axios
        .post("/api/users/register", userData)
        .then(res => this.props.history.push("/login"))
        .catch(err => {
            const errors = err.response.data;
            this.setState({errors});
        });
    }

    render() {
        return(
            <Container maxWidth="sm" className='auth-container'>
                <div className='auth-header'>
                    <Typography className='login-login' variant="h3" align="center" gutterBottom > Register </Typography>
                    <Typography className='login-text' align="center" gutterBottom > Already have an Account?   <Link className='login-text' to='/login'> Log in </Link> </Typography>
                </div>
                
                <form noValidate onSubmit={this.onSubmit} className='auth-form'>
                    <FormControl className="auth-form-input">
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <Input
                        id="name"
                        value={this.state.name}
                        onChange={this.onChange}
                        aria-describedby="name"
                        />
                        <FormHelperText error id="email-error">{this.state.errors.name}</FormHelperText>
                    </FormControl>
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
                    <FormControl className="auth-form-input">
                        <InputLabel htmlFor="password2">Email</InputLabel>
                        <Input
                        id="password2"
                        value={this.state.password2}
                        onChange={this.onChange}
                        aria-describedby="password2"
                        />
                        <FormHelperText error id="password2-error">{this.state.errors.password2}</FormHelperText>
                    </FormControl>
                    <Button
                    variant="contained" 
                    color="primary"
                    type="submit"
                    className="login-button"
                    >
                    Register
                    </Button>
                </form>
            </Container>
        )
    }
}
export default Register;
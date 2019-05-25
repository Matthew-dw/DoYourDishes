import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from 'jwt-decode'

// CSS
import './css/app.css'

// Components
import Landing from './components/landing';
import Register from './components/auth/register';
import Login from './components/auth/login'
import Dashboard from "./components/dashboard/dashboard";

const isEmpty = require("is-empty");

class App extends React.Component {
    state = {
        isAuthenticated: false,
        user: {},
        loading: false
    }

    componentDidMount() {
        if (localStorage.jwtToken) {
            // Set auth token header auth
            const token = localStorage.jwtToken;
            setAuthToken(token);
            // Decode token and get user info and exp
            const decoded = jwt_decode(token);
            // Set user and isAuthenticated
            this.login(decoded)
            const currentTime = Date.now() / 1000; // to get in milliseconds
            if (decoded.exp < currentTime) this.logout();
        }
    }

    login = (decoded) => {
        this.setState({
            isAuthenticated: !isEmpty(decoded),
            user: decoded
        });
    }

    logout = () => {
        localStorage.removeItem("jwtToken");
        setAuthToken(false);
        this.setState({
            user: {}
        })
    }

    render() {
        return (
            <Router>
                <div className="App">
                <Route exact path="/" render={(props) => <Landing auth={this.state}  {...props} />}/>
                <Route exact path="/register" render={(props) => <Register auth={this.state} {...props} />}/>
                <Route exact path="/login" render={(props) => <Login auth={this.state} login={this.login} {...props} />}/>
                <Route exact path="/dashboard" render={(props) => <Dashboard auth={this.state} logout={this.logout} {...props} />}/>
                </div>
            </Router>
        );
    }
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from 'jwt-decode'

// Components
import Landing from './components/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login'
import Dashboard from "./components/dashboard/Dashboard";

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

    login = decoded => {
        this.setState({
            isAuthenticated: !isEmpty(decoded),
            user: decoded
        });
    }

    logout = () => {
        localStorage.removeItem("jwtToken");
        setAuthToken(false);
        this.setState({
            isAuthenticated: false,
            user: {}
        })
    }

    render() {
        return (
            <Router>
                <div className="App">
                <Route exact path="/" render={(props) => <Landing auth={this.state} login={this.login} logout={this.logout} {...props} />}/>
                <Route exact path="/dashboard" render={(props) => <Dashboard auth={this.state} logout={this.logout} {...props} />}/>
                </div>
            </Router>
        );
    }
}

export default App;
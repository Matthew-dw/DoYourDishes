import React, { Component } from 'react';
import axios from 'axios';


import Drawer from '@material-ui/core/drawer';
import DrawerContent from './drawer';


import '../../css/dashboard.css';


class Dashboard extends Component {
    state = {
        open: true,
        houses: [],
    }
    
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logout();
        this.props.history.push('/login');
    }

    getHouses = () => {
        const id = this.props.auth.user.id;
        axios.get("/api/houses/" + id)
            .then(res => {
                console.log(res.data);
                return (res.data)
            })
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.auth.isAuthenticated) this.props.history.push("/login");
    }

    toggleDrawer = () => {
        this.setState({open: !this.state.open})
    }

    render() {
        const { user } = this.props.auth;
        const houses = this.getHouses();

        const margin = {
            'marginLeft': `${this.state.open ? 300 : 0}px`
        }
        return (
            <div>
                <div style={margin}>
                    Hello {user.name}!d
                    <button onClick={this.onLogoutClick}> sign out</button>
                </div>
                <Drawer
                variant="persistent"
                anchor="left"
                open={this.state.open}
                >
                    <DrawerContent 
                    toggle={this.toggleDrawer}
                    houses={[{name: 'hello'}]}
                    />
                    {houses}
                </Drawer>
            </div>
    );
  }
}
export default Dashboard;
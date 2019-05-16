import React from 'react';
import NavBar from './navbar'
import HomeScreen from './homescreen'

class App extends React.Component {
    state = {
        current: <HomeScreen />,
    }
    render() {
        return (
            <div>
                <NavBar />
                { this.state.current }
            </div>
        )
    }
}
export default App;
import React from 'react';
import '../css/page.css'
import Third from './third'

const HomeScreen = () => {
    return (
        <div>
            <div className='header'>
                Organize Your Home
            </div>
            <div className='thirds'>
                <Third title="Invite Housemates" 
                blurb="Add as many people as you would like to the home. Organize your home into different groups with their own responsibilities"/>
                <Third title="Assign Chores" 
                blurb="Easily create chores and divide them among the whole house or specific people. "/>
                <Third title="Do Your Dishes" 
                blurb="Set up notifications to remind you of your chores. Notify other house members easily by clicking on members of your home. "/>
            </div> 
            <div className="third-button">
                Sign Up Now
            </div>
        </div>
    )
}

export default HomeScreen;
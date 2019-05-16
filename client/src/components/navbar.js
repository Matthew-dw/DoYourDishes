import React from 'react'
import '../css/nav.css'
const NavBar = () => {
    return (
        <div className='navbar'>
            <button className='homebutton'> Do Your Dishes </button>
            <div className='navbuttons'>
                <button className='navbutton'> Sign Up </button>
                <button className='navbutton'> Log In </button>
            </div>
        </div>
    )
}
export default NavBar;
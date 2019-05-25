import React from 'react'
import { Link } from "react-router-dom";
import '../../css/nav.css'
const NavBar = () => {
    return (
        <div className='navbar'>
            <Link to='/'><button className='homebutton'> Do Your Dishes </button></Link>
            <div className='navbuttons'>
            <Link to='/login'><button className='navbutton'>  Log In </button></Link>
            <Link to='/register'><button className='navbutton'>  Sign Up  </button></Link>
            </div>
        </div>
    )
}
export default NavBar;
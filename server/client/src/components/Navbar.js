import React from 'react';
import { Link } from 'react-router-dom';
import { ADD_ARTICLES_FROM_FETCH } from '../actions/actionTypes';

const Navbar = (props) => {
    return(
        <div>
            <Link to="/">Home</Link>
            <Link to="/index">Index</Link>
            <Link to="/detail">Detail</Link>
            <Link to="/login">Log In</Link>
            <Link to="/register">Sign Up</Link>
        </div>
    )
}

export default Navbar;
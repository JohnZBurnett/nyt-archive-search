import React from 'react';
import { Link } from 'react-router-dom';
import { ADD_ARTICLES_FROM_FETCH } from '../actions/actionTypes';

const Navbar = (props) => {
    return(
        <div>
            <Link to="/index">Index</Link>
            <Link to="/detail">Detail</Link>
        </div>
    )
}

export default Navbar;
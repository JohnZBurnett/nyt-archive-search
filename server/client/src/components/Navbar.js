import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { ADD_ARTICLES_FROM_FETCH } from '../actions/actionTypes';


const mapStateToProps = function(state) {
    return {
        auth: state.auth
    }
}
const Navbar = (props) => {
    return(
        <div>
            <Link to="/">Home</Link>
            <Link to="/index">Index</Link>
            <Link to="/detail">Detail</Link>
            <Link to="/login">Log In</Link>
            <Link to="/register">Sign Up</Link>
            <a href="/api/logout">Log Out</a>
        </div>
    )
}

export default connect(mapStateToProps)(Navbar);
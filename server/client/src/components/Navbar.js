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
            { props.auth ? <Link to="/saved">Saved Articles</Link> : null}
            { props.auth ? null : <Link to="/login">Log In</Link> }
            { props.auth ? null : <Link to="/register">Sign Up</Link>}
            { props.auth ? <a href="/api/logout">Log Out</a> : null } 
        </div>
    )
}

export default connect(mapStateToProps)(Navbar);
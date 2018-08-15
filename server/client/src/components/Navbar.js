import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { ADD_ARTICLES_FROM_FETCH } from '../actions/actionTypes';
import { withRouter } from 'react-router-dom'; 

const mapStateToProps = function(state) {
    return {
        auth: state.auth
    }
}

// const redirectToIndex = (props.history) => {
//     history.push("/"); 
// }


const Navbar = (props) => {
    return(
        <Fragment>
            <h1 className="site-header typewriter-font">1943: A Year in the Times</h1>
            <div className="navbar">
                <Link className="navbar-link typewriter-font" to="/">Home</Link>
                <Link className="navbar-link typewriter-font" to="/index">Index</Link>
                <Link className="navbar-link typewriter-font" to="/detail">Detail</Link>
                { props.auth ? <Link className="navbar-link typewriter-font" to="/saved">Saved Articles</Link> : null}
                { props.auth ? null : <Link className="navbar-link typewriter-font" to="/login">Log In</Link> }
                { props.auth ? null : <Link className="navbar-link typewriter-font" to="/register">Sign Up</Link>}
                { props.auth ? <a className="navbar-link typewriter-font" href="/api/logout">Log Out</a> : null } 
            </div>
        </Fragment>
    )
}

export default connect(mapStateToProps)(Navbar);
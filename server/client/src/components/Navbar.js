import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { recordUserLogout } from '../actions/index'; 
import { withRouter } from 'react-router-dom'; 
import axios from 'axios'; 

const mapStateToProps = function(state) {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = function(dispatch) {
    return {
        recordUserLogout: () => dispatch(recordUserLogout())
    }
}




const Navbar = (props) => {

    const redirectToIndex = () => {
        console.log("PROPS : ", props); 
        axios.get('/api/logout'); 
        props.recordUserLogout(); 

        props.history.push("/"); 
    }; 

    return(
        <Fragment>
            <div className="navbar">
                <Link className="navbar-link typewriter-font" to="/">Home</Link>
                <Link className="navbar-link typewriter-font" to="/index">Article Index</Link>
                { props.auth ? <Link className="navbar-link typewriter-font" to="/saved">Saved Articles</Link> : null}
                { props.auth ? null : <Link className="navbar-link typewriter-font" to="/login">Log In</Link> }
                { props.auth ? null : <Link className="navbar-link typewriter-font" to="/register">Sign Up</Link>}
                <Link className="navbar-link typewriter-font" to="/analytics">Analytics</Link>
                { props.auth ? <a className="navbar-link typewriter-font" href="#" onClick={redirectToIndex}>Log Out</a> : null } 
            </div>
        </Fragment>
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
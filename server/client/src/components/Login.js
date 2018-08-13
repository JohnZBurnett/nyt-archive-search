import React, { Component } from 'react';

class Login extends Component {

    constructor(props) {

        super(); 
        this.state = {
            username: '',
            password: ''
        }
    }; 

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleFormSubmit = (event) => {
        event.preventDefault(); 
    }

   render() {
    return(
        <div>
            <form action="/api/login" method="post" onSubmit={this.handleFormSubmit}>
    <div>
        <label>Username:</label>
        <input type="text" name="username" onChange={this.handleUsernameChange}/>
    </div>
    <div>
        <label>Password:</label>
        <input type="password" name="password" onChange={this.handlePasswordChange}/>
    </div>
    <div>
        <input type="submit" value="Log In"/>
    </div>
</form>
        </div>
    )
   } 
}

export default Login; 
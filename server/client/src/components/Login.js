import React, { Component } from 'react';
import axios from 'axios'; 
import { Button, Checkbox, Form } from 'semantic-ui-react'

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

   render() {
    return(
        /* <div>
            <form action="/api/login" method="post">
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
        </div> */
        <Form action="/api/login" method="post">
            <Form.Field>
            <label>Username:</label>
            <input type="text" name="username" onChange={this.handleUsernameChange}/> 
            </Form.Field>
            <Form.Field>
            <label>Password:</label>
            <input type="password" name="password" onChange={this.handlePasswordChange}/>
            </Form.Field>
            <div>
                <input type="submit" value="Log In" className="submit"/>
            </div>
        </Form>
    )
   } 
}

export default Login; 



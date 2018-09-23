import React from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'

const Register = () => {
    return(
    /*
        <div>
            <form action="/api/register" method="post">
    <div>
        <label>Username:</label>
        <input type="text" name="username"/>
    </div>
    <div>
        <label>Password:</label>
        <input type="password" name="password"/>
    </div>
    <div>
        <input type="submit" value="Register"/>
    </div>
</form>
        </div>
    */

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
        <input type="submit" value="Sign Up" className="submit"/>
    </div>
    </Form>
    )
}

export default Register; 
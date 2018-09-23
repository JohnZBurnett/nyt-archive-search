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

    // handleFormSubmit = async (event) => {
    //     event.preventDefault(); 

    //     const { username, password } = this.state;
    //     let result = await axios.post('/api/login', { username, password }); 
    //     console.log("RESULT :", result); 
    // }

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
        <Form>
            <Form.Field>
            <label>First Name</label>
            <input placeholder='First Name' />
            </Form.Field>
            <Form.Field>
            <label>Last Name</label>
            <input placeholder='Last Name' />
            </Form.Field>
            <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
            <Button type='submit'>Submit</Button>
        </Form>
    )
   } 
}

export default Login; 



const FormExampleForm = () => (
  <Form>
    <Form.Field>
      <label>First Name</label>
      <input placeholder='First Name' />
    </Form.Field>
    <Form.Field>
      <label>Last Name</label>
      <input placeholder='Last Name' />
    </Form.Field>
    <Form.Field>
      <Checkbox label='I agree to the Terms and Conditions' />
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
)

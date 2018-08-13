import React from 'react';

const Register = () => {
    return(
        <div>
            <form action="/api/login" method="post">
    <div>
        <label>Username:</label>
        <input type="text" name="username"/>
    </div>
    <div>
        <label>Password:</label>
        <input type="password" name="password"/>
    </div>
    <div>
        <label>Confirm Password:</label>
        <input type="password" name="confirm-password"/>
    </div>
    <div>
        <input type="submit" value="Register"/>
    </div>
</form>
        </div>
    )
}

export default Register; 
import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login(props) {
    const [formState, setFormState] = useState({ email: '', password: ''})
    const [login, { error }] = useMutation(LOGIN);

    const handleFormSubmit = async event => {
        event.preventDefault();
        try{
            const loginResponse = await login({ variables: { email: formState.email, password: formState.password } })
            const token = loginResponse.data.login.token;        
            Auth.login(token);
        } catch (e) {
            console.log(e);
        }
        console.log("You are logged in")
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit= {handleFormSubmit}>
                <div>
                    <label>Email address:</label>
                    <input placeholder="your@email.com"
                        name="email"
                        type="email"
                        onChange={handleChange}/>
                </div>
                <div>
                    <label>Password:</label>
                    <input placeholder="*******"
                        name="password"
                        type="password"
                        onChange={handleChange} />
                </div>
                { error ? <div>
                    <p> The provided credentials are incorrect</p>
                </div> : null
                }
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>

    );

}

export default Login;
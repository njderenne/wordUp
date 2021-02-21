import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
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
        <div className="min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 justify-center bg-gray-700">
            <form onSubmit= {handleFormSubmit} className="m-auto my-60 max-w-md w-full space-y-5 max-h-full bg-yellow-200 bg-transparent">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Login
                </h2>
                <div>
                    <div>
                        <input placeholder="Email"
                            name="email"
                            type="email"
                            onChange={handleChange}
                            className="focus:ring-indigo-500 focus: border-indigo-500 mx-auto mb-1.5 flex-1 block w-5/6 rounded sm:text-sm border-gray-300" />
                    </div>
                    <div>
                        <input placeholder="Password"
                            name="password"
                            type="password"
                            onChange={handleChange} 
                            className="focus:ring-indigo-500 focus: border-indigo-500 mx-auto mb-1.5 flex-1 block w-5/6 rounded sm:text-sm border-gray-300"/>
                    </div>
                    { error ? <div>
                        <p> The provided credentials are incorrect</p>
                    </div> : null
                    }
                    <button type="submit" className="w-10/12 mx-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">Login</button>
                </div>
                <p className="mx-auto text-center">Don't have an account yet?
                    <Link to="/signup"> Click here to sign up!</Link>
                </p>
            </form>
        </div>

    );

}

export default Login;
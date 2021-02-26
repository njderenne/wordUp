import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login() {
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
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    return (
        <div className="min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray">
            <div className="absolute inset-y-0 right-0 p-14">
                <h1 className="font-sans text-5xl mx-auto mr-5">word</h1>
                <h1 className="font-sans text-5xl text-purple justify-right text-right">U</h1>
                <h1 className="font-sans text-5xl justify-right text-right">p</h1>
            </div>
            <form onSubmit= {handleFormSubmit} className="m-auto my-60 max-w-md w-full space-y-5 max-h-full bg-purple rounded-3xl">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    LOGIN
                </h2>
                <div>
                    <div>
                        <input placeholder="Email"
                            name="email"
                            type="email"
                            onChange={handleChange}
                            className="mx-auto mb-1.5 flex-1 block w-5/6 rounded sm:text-sm border-gray-300" />
                    </div>
                    <div>
                        <input placeholder="Password"
                            name="password"
                            type="password"
                            onChange={handleChange} 
                            className="mx-auto mb-1.5 flex-1 block w-5/6 rounded sm:text-sm border-gray-300"/>
                    </div>
                    { error ? <div>
                        <p className="text-red text-center"> The provided credentials are incorrect</p>
                    </div> : null
                    }
                    <button type="submit" className="w-10/12 mx-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md bg-purple-dark hover:bg-gray-lightest md:py-4 md:text-lg md:px-10">Login</button>
                </div>
                <p className="mx-auto text-center">Don't have an account yet?
                    <Link to="/signup" className='bg-gray-lightest rounded hover:bg-purple-dark hover:text-gray-lightest'> Click here to sign up!</Link>
                </p>
            </form>
        </div>

    );

}

export default Login;
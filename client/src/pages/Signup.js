import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
    const [formState, setFormState] = useState({ email: '', password: '', rePassword: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const { email, password, rePassword } = formState
    const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async event => {
        event.preventDefault();

        if (formState.firstName && formState.lastName && formState.email && formState.password && formState.rePassword) {
            if (validateEmail(formState.email)) {
                if (formState.password === formState.rePassword) {
                    if (formState.password.length > 4) {
                        const mutationResponse = await addUser({
                            variables: {
                                email: formState.email, password: formState.password,
                                firstName: formState.firstName, lastName: formState.lastName
                            }
                        });
                        const token = mutationResponse.data.addUser.token;
                        Auth.login(token);
                        console.log("You are now signed up for wordUp!");
                    } else {
                        setErrorMessage("Your password needs to be at least 5 characters");
                    }
                } else {
                    setErrorMessage("Your passwords do not match");
                }
            } else {
                setErrorMessage("You need to enter a valid email");
            }
        } else {
            setErrorMessage("You need to fill out all forms");
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });

        if (event.target.name === "firstName") {
            if (event.target.value) {
                console.log("first name entered");
            } else {
                console.log('enter a first name');
            }
        }

        if (event.target.name === "lastName") {
            if (event.target.value) {
                console.log("last name entered");
            } else {
                console.log('enter a last name');
            }
        }

        if (event.target.name === "email") {
            const correctEmail = validateEmail(event.target.value);
            if (correctEmail) {
                console.log("email is valid");
            } else {
                console.log('enter valid email');
            }
        }

        if (event.target.name === "password") {
            if (event.target.value.length > 4) {
                console.log("password is valid");
            } else {
                console.log('enter a password greater than 5 characters');
            }
        }

        if (event.target.name === "rePassword") {
            if (event.target.value === formState.password) {
                console.log("passwords match");
            } else {
                console.log("passwords do not match")
            }
        }

    };

    const validateEmail = (email) => {
        let pattern = new RegExp(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/);
        return pattern.test(String(email).toLowerCase());
    }

    return(
        <div className="min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 justify-center bg-gray">
            <form onSubmit={handleFormSubmit} className="m-auto my-60 max-w-md w-full space-y-5 max-h-full bg-purple bg-transparent rounded-3xl">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    SIGN UP
                </h2>
                <div className="">
                    <div>
                        <input type="text" 
                         name="firstName" placeholder="First Name"
                         onBlur={handleChange}
                         className="focus:ring-indigo-500 focus:border-indigo-500 mx-auto mb-1.5 flex-1 block w-5/6 rounded sm:text-sm border-gray-300" />
                    </div>
                    <div>
                        <input type="text"
                        name="lastName" placeholder="Last Name" 
                        onBlur={handleChange}
                        className="focus:ring-indigo-500 focus: border-indigo-500 mx-auto mb-1.5 flex-1 block w-5/6 rounded sm:text-sm border-gray-300" />
                    </div>
                    <div>
                        <input type="email" 
                        name="email" placeholder="Email" 
                        onBlur={handleChange} 
                        className="focus:ring-indigo-500 focus: border-indigo-500 mx-auto mb-1.5 flex-1 block w-5/6 rounded sm:text-sm border-gray-300" />
                    </div>
                    <div>
                        <input type="password"
                        name="password" placeholder="Password" 
                        onBlur={handleChange} 
                        className="focus:ring-indigo-500 focus: border-indigo-500 mx-auto mb-1.5 flex-1 block w-5/6 rounded sm:text-sm border-gray-300" />
                    </div>
                    <div>
                        <input type="password" 
                        name="rePassword" placeholder="Confirm Password" 
                        onChange={handleChange} 
                        className="focus:ring-indigo-500 focus: border-indigo-500 mx-auto mb-1.5 flex-1 block w-5/6 rounded sm:text-sm border-gray-300" />
                    </div>
                    <button type="submit" className="w-10/12 mx-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-dark hover:bg-gray-lightest md:py-4 md:text-lg md:px-10">Sign Up!</button>
                    {errorMessage && (
                        <div>
                            <p className="text-red text-center">{errorMessage}</p>
                        </div>
                    )}                    
                </div>
                <p className="mx-auto text-center">Already have an account? 
                    <Link to="/" className='bg-gray-lightest rounded hover:bg-purple-dark hover:text-gray-lightest'> Click here to login!</Link>
                </p>
            </form>

        </div>
    )
}

export default Signup;
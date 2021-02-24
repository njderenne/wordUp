import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async event => {
        event.preventDefault();
        const mutationResponse = await addUser({
            variables: {
                email: formState.email, password: formState.password,
                firstName: formState.firstName, lastName: formState.lastName
            }
        });
        const token = mutationResponse.data.addUser.token;
        Auth.login(token);
        console.log("You are now signed up for wordUp!");
    };

    // const validateData = async event => {
    //     event.preventDefault();

    //     let input = this.state.input;
    //     let errors = {};
    //     let isValid = true;

    //     if (!input["firstName"]) {
    //         isValid = false;
    //         errors["firstName"] = "Please enter your first name.";
    //     }

    //     if (!input["lastName"]) {
    //         isValid = false;
    //         errors["lastName"] = "Please enter your last name.";
    //     }

    //     if (typeof input ["email"] !== "undefined") {

    //         let pattern = new RegExp(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/);
    //         if (!pattern.test(input["email"])) {
    //             isValid = false;
    //             errors["email"] = "Please enter valid email address.";
    //         }
    //     }

    //     if (!input["password"]) {
    //         isValid = false;
    //         errors["password"] = "Please enter your password";
    //     }

    //     if (!input["rePassword"]) {
    //         isValid = false;
    //         errors["rePassword"] = "Please re-enter your password";
    //     }

    //     if (typeof input["password"] !== "undefined" && typeof input["rePassword"] !== "undefined") {

    //         if(input["password"] != input["rePassword"]) {
    //             isValid = false;
    //             errors["password"] = "Passwords do not match!";
    //         }
    //     }

    //     this.setFormState({
    //         errors: errors
    //     })

    //     return validateData;
    // };


    const handleChange = event => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    return(
        <div className="min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 justify-center bg-gray">
            <form onSubmit={handleFormSubmit} className="m-auto my-60 max-w-md w-full space-y-5 max-h-full bg-purple bg-transparent rounded-3xl">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    SIGN UP
                </h2>
                <div className="">
                    <div>
                        <input type="text" value= {formState.input.firstName} name="firstName" placeholder="First Name" onChange={handleChange} className="focus:ring-indigo-500 focus:border-indigo-500 mx-auto mb-1.5 flex-1 block w-5/6 rounded sm:text-sm border-gray-300" />
                    </div>
                    <div>
                        <input type="text" value= {formState.input.lastName} name="lastName" placeholder="Last Name" onChange={handleChange} className="focus:ring-indigo-500 focus: border-indigo-500 mx-auto mb-1.5 flex-1 block w-5/6 rounded sm:text-sm border-gray-300" />
                    </div>
                    <div>
                        <input type="email" value= {formState.input.email} name="email" placeholder="Email" onChange={handleChange} className="focus:ring-indigo-500 focus: border-indigo-500 mx-auto mb-1.5 flex-1 block w-5/6 rounded sm:text-sm border-gray-300" />
                    </div>
                    <div>
                        <input type="password" value= {formState.input.password} name="password" placeholder="Password" onChange={handleChange} className="focus:ring-indigo-500 focus: border-indigo-500 mx-auto mb-1.5 flex-1 block w-5/6 rounded sm:text-sm border-gray-300" />
                    </div>
                    <div>
                        <input type="password" value= {formState.input.rePassword} name="rePassword" placeholder="Confirm Password" onChange={handleChange} className="focus:ring-indigo-500 focus: border-indigo-500 mx-auto mb-1.5 flex-1 block w-5/6 rounded sm:text-sm border-gray-300" />
                    </div>
<<<<<<< HEAD
                    <button type="submit" value= "" className="w-10/12 mx-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">Sign Up!</button>
=======
                    <button type="submit" className="w-10/12 mx-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-dark hover:bg-gray-lightest md:py-4 md:text-lg md:px-10">Sign Up!</button>
>>>>>>> 2cde0174dc580fa4c2d664b238b4391c37e2f6ce
                </div>
            </form>

        </div>
    )
}

export default Signup;
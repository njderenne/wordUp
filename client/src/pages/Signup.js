import React from 'react';
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';

function Signup() {
    return(
        <div className="min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 justify-center">
            <form className="m-auto my-60 max-w-md w-full space-y-5 max-h-full bg-yellow-200 bg-transparent">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    SIGN UP
                </h2>
                <div className="">
                    <div>
                        <input type="text" name="firstName" placeholder="First Name" className="focus:ring-indigo-500 focus:border-indigo-500 mx-auto mb-1.5 flex-1 block w-5/6 rounded sm:text-sm border-gray-300" />
                    </div>
                    <div>
                        <input type="text" name="lastName" placeholder="Last Name" className="focus:ring-indigo-500 focus: border-indigo-500 mx-auto mb-1.5 flex-1 block w-5/6 rounded sm:text-sm border-gray-300" />
                    </div>
                    <div>
                        <input type="email" name="email" placeholder="Email" className="focus:ring-indigo-500 focus: border-indigo-500 mx-auto mb-1.5 flex-1 block w-5/6 rounded sm:text-sm border-gray-300" />
                    </div>
                    <div>
                        <input type="text" name="password" placeholder="Password" className="focus:ring-indigo-500 focus: border-indigo-500 mx-auto mb-1.5 flex-1 block w-5/6 rounded sm:text-sm border-gray-300" />
                    </div>
                    <div>
                        <input type="text" name="rePassword" placeholder="Confirm Password" className="focus:ring-indigo-500 focus: border-indigo-500 mx-auto mb-1.5 flex-1 block w-5/6 rounded sm:text-sm border-gray-300" />
                    </div>
                    <button type="submit" className="w-10/12 mx-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">Sign Up!</button>
                </div>
                <p className="mx-auto text-center">Do you already have an account?
                    <Link to="/login"> Click here to login!</Link>
                </p>
            </form>

        </div>
    )
}

export default Signup;
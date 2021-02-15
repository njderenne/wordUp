import React from 'react';
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';

function Signup() {
    return(
        <div className="min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 justify-center">
            <form className="mx-auto max-w-md w-full space-y-5 min-h-screen bg-yellow-200 bg-transparent">
                <p className="mx-auto font-black">SIGN UP</p>
                <div className="textfields">
                    <div>
                        <input type="text" name="firstName" placeholder="First Name" className="focus:ring-indigo-500 focus: border-indigo-500 mx-auto mb-1.5 flex-1 block w-5/6 rounded sm:text-sm border-gray-300" />
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
                    <button type="submit">Sign Up!</button>
                </div>
            </form>
        </div>
    )
}

export default Signup;
import React from 'react';
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';

function Signup() {
    return(
        <div className="main">
            <form className="form">
                <h1>SIGN UP</h1>
                <div className="textfields">
                    <div>
                        <input type="text" name="firstName" />
                    </div>
                    <div>
                        <input type="text" name="lastName" />
                    </div>
                    <div>
                        <input type="email" name="email" />
                    </div>
                    <div>
                        <input type="text" name="password" />
                    </div>
                    <div>
                        <input type="text" name="rePassword" />
                    </div>
                    <button type="submit">Sign Up!</button>
                </div>
            </form>
        </div>
    )
}

export default Signup;
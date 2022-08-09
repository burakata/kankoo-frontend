import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ErrorMessageType, User } from "../types/user";
import api from "../utils/api";

import "./Login.css";


interface ChildProps {
    isSubmitted: boolean;
    setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}


export default function Login({ isSubmitted, setIsSubmitted, user, setUser }: ChildProps) {
    // React States
    const [errorMessages, setErrorMessages] = useState<ErrorMessageType>({
        name: '',
        message: '',
    }
    );

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        //Prevent page reload
        event.preventDefault();

        var { uname, pass } = document.forms[0];

        // Find user login info
        api().get<User>("/users/" + uname.value).then(
            (response) => {
                console.log(response.data);
                const userData = response.data;
                // Compare user info
                if (userData) {
                    if (userData.Password !== pass.value) {
                        // Invalid password
                        setErrorMessages({ name: "pass", message: errors.pass });
                        setUser({
                            Id: -1,
                            Name: '',
                            Password: '',
                            UserName: '',
                            IsAdmin:false
                        });
                    } else {
                        setIsSubmitted(true);
                        setUser(userData);
                    }
                } else {
                    // Username not found
                    setErrorMessages({ name: "uname", message: errors.uname });
                    setUser({
                        Id: -1,
                        Name: '',
                        Password: '',
                        UserName: '',
                        IsAdmin:false
                    });
                }
            }
        )
        .catch(error => console.error('Error' + error));

    };

    // Generate JSX code for error message
    const renderErrorMessage = (name: string) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    // JSX code for login form
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required />
                    {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
        </div>
    );

    return (
        <div className="app">
            <div className="login-form">
                <div className="title">Sign In</div>
                {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
            </div>
        </div>
    );
}

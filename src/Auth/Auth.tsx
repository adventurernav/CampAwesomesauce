import React, { Component } from "react";
import { Login } from './Login/LoginForm'
import { RegisterForm } from "./Register/RegisterForm";


class Auth extends Component {

    render() {
        return (
            <div>
                <h1>Auth</h1>
                <RegisterForm />
                <Login onSubmit={(values) => {
                    console.log(values);

                }} />
            </div>
        )
    }
}
export default Auth;
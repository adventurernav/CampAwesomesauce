import React, { Component } from "react";
import { LoginForm } from './Login/LoginForm'
import { RegisterForm } from "./Register/RegisterForm";
import Logout from "./Logout";

type AuthProps = {
    updateToken: (token:string, authenticated:boolean)=>void
}
class Auth extends Component <AuthProps> {

    render() {
        return (
            <div>
                <h1>Auth</h1>
                <RegisterForm updateToken={this.props.updateToken}/>
                <LoginForm updateToken={this.props.updateToken}/>
                <Logout updateToken={this.props.updateToken}/>
            </div>
        )
    }
}
export default Auth;
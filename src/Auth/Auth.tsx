import React, { Component } from "react";
import { LoginForm } from './Login/LoginForm'
import { RegisterForm } from "./Register/RegisterForm";
import Logout from "./Logout";
import { Grid } from "@material-ui/core";

type AuthProps = {
    updateToken: (token: string, authenticated: boolean) => void
}
class Auth extends Component<AuthProps> {

    render() {
        return (
            <div>
                <Grid container direction="row" justify="space-around" alignItems="center" spacing={2}>
                    <Grid item >
                        <RegisterForm updateToken={this.props.updateToken} />
                    </Grid>
                    <Grid item>
                        <LoginForm updateToken={this.props.updateToken} />
                    </Grid>
                    <Grid item>
                        <Logout updateToken={this.props.updateToken} />
                    </Grid>
                </Grid>
            </div>
        )
    }
}
export default Auth;
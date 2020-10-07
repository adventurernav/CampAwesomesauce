import React, { Component } from "react";
import { LoginForm } from './Login/LoginForm'
import  RegisterForm  from "./Register/RegisterForm";
import { Grid } from "@material-ui/core";

type AuthProps = {
    updateToken: (token: string, authenticated: boolean) => void,
    appState: { authenticated: boolean, token: string | null },

}
class Auth extends Component<AuthProps> {
componentDidMount(){
    console.log(this.props)

}
    render() {
        return (
            <div>
                <Grid container direction="row" justify="space-around" alignItems="center" spacing={2}>
                    <Grid item >
                        <RegisterForm updateToken={this.props.updateToken} appState={this.props.appState} />
                    </Grid>
                    <Grid item>
                        <LoginForm updateToken={this.props.updateToken} />
                    </Grid>
                </Grid>
                
            </div>
        )
    }
}
export default Auth;
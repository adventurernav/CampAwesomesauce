import { Button, TextField } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { Component } from "react";
import APIURL from "../helpers/environment";
import { Redirect } from "react-router-dom";


interface Values {
    email: string, 
    password: string
}
type LoginFormProps = {
    updateToken: (token:string, authenticated:boolean)=>void
    updateAdmin: (admin:boolean)=>void,
    appState: { authenticated: boolean, token: string | null, admin: boolean},
}
type stateValues={
    submitted: boolean,
    admin: boolean
}
export class LoginForm extends Component <LoginFormProps,stateValues> {
    state={
        submitted: false,
        admin: false
    }
    LoginSubmit(values:Values, loginProps: LoginFormProps){
        fetch(`${APIURL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: values.email,
                password: values.password
            })
        })
            .then(res => res.json())
            .then((data) => {
                if (!data.error){
                    window.localStorage.setItem('token', data.sessionToken)
                    loginProps.updateToken(data.sessionToken, true)
                    loginProps.updateAdmin(data.user.role==='admin'? true: false)
                    this.setState({ submitted: true, admin: (data.user.role==='admin'? true: false) })
                } else {
                    alert(`${data.error}`)
                }
                    
            })
            .catch(err => console.log(err))
    }
    render(){
        return(
        <div>
            {(this.state.submitted === true) ? 
            ((this.state.admin)?<Redirect to='/admin' />:<Redirect to='/dashboard' />) 
            : null}
            <h1>Login</h1>
            <Formik 
            initialValues={{email: '', password: ''}} 
            onSubmit={values=> {
                this.LoginSubmit(values, this.props);
            }}
            >
                {({values, handleChange, handleBlur}) => (
                <Form>
                <div className="div-padding">
                    <TextField 
                    name="email" 
                    label="E-mail"
                    type="email"
                    value={values.email} 
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    fullWidth
                    />
                </div>
                <div className="div-padding">
                    <TextField 
                    name="password" 
                    label="Password"
                    type="password"
                    value={values.password} 
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    fullWidth
                    />
                </div>
                <Button color="primary" variant='outlined' type='submit'>Login</Button>
                </Form>
            )}
            </Formik>
        </div>
    )}
}

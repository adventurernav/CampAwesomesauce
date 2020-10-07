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
}
type stateValues={
    submitted: boolean
}
export class LoginForm extends Component <LoginFormProps,stateValues> {
    state={
        submitted: false
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
                console.log(data)
                if (!data.error){
                    window.localStorage.setItem('token', data.sessionToken)
                    loginProps.updateToken(data.sessionToken, true)
                    this.setState({ submitted: true })
                } else {
                    alert(`${data.error}`)
                }
                    
            })
            .catch(err => console.log(err))
    }
    render(){
        return(
        <div>
            {(this.state.submitted === true) ? <Redirect to='/profile' /> : null}
            <h1>Login</h1>
            <Formik 
            initialValues={{email: '', password: ''}} 
            onSubmit={values=> {
                this.LoginSubmit(values, this.props);
            }}
            >
                {({values, handleChange, handleBlur}) => (
                <Form>
                <div>
                    <TextField 
                    name="email" 
                    label="E-mail"
                    type="email"
                    value={values.email} 
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    />
                </div>
                <div>
                    <TextField 
                    name="password" 
                    label="Password"
                    type="password"
                    value={values.password} 
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    />
                </div>
                <Button type='submit'>Login</Button>
                </Form>
            )}
            </Formik>
        </div>
    )}
}

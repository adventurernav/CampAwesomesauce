import { Button, TextField } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { Component } from "react";
import LoginSubmit from "./LoginSubmit";

interface Values {
    email: string, 
    password: string
}
type LoginFormProps = {
    updateToken: (token:string, authenticated:boolean)=>void
}

export class LoginForm extends Component <LoginFormProps> {
    render(){return(
        <div>
            <h1>Login</h1>
            <Formik 
            initialValues={{email: '', password: ''}} 
            onSubmit={values=> {
                LoginSubmit(values, this.props);
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

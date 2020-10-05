import { Button, TextField } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { Component } from "react";
import RegisterSubmit from './RegisterSubmit'

type RegisterFormProps = {
    updateToken: (token:string, authenticated:boolean)=>void
}

export class RegisterForm extends Component <RegisterFormProps> {
    
    render(){return (
        <div>
            <h1>Register</h1>
            <Formik
                initialValues={{ 
                    firstName: '', 
                    lastName: '', 
                    email: '', 
                    password: '', 
                    role: '' }}
                onSubmit={values => {
                    RegisterSubmit(values, this.props)
                }}
            >
                {({ values, handleChange, handleBlur }) => (
                    <Form>

                        <div>
                            <TextField
                                name="firstName"
                                label="First Name"
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div>
                            <TextField
                                name="lastName"
                                label="Last Name"
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
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
                    
                        <Button type='submit'>Create Account</Button>
                    </Form>
                )}
            </Formik>
        </div>
    )}
}

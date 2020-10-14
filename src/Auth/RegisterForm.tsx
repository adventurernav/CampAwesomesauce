import { Button, TextField } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { Component } from "react";
import APIURL from "../helpers/environment";
import { Redirect } from "react-router-dom";

type RegisterFormProps = {
    appState: { authenticated: boolean, token: string | null }
    updateToken: (token: string, authenticated: boolean) => void
}
interface Values {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string
}
type stateValues ={
    submitted: boolean
}
class RegisterForm extends Component<RegisterFormProps, stateValues> {
    constructor(props:RegisterFormProps){
        super(props)
        this.state = {
            submitted: false
        }
        this.RegisterSubmit=this.RegisterSubmit.bind(this)
    }
    
    RegisterSubmit(values: Values, submitProps: RegisterFormProps):void {
        
        fetch(`${APIURL}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
                role: 'campmate'
            })
        })
            .then(res => res.json())
            .then((data) => {
                if (!data.error){
                window.localStorage.setItem('token', data.sessionToken)
                submitProps.updateToken(data.sessionToken, true)
                this.setState({ submitted: true })
                } else {
                    alert(`${data.error.errors[0].message}`)
                }
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                {(this.state.submitted === true) ? <Redirect to='/profile' /> : null}
                <h1>Register</h1>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        role: ''
                    }}
                    onSubmit={values => {
                        this.RegisterSubmit(values, this.props);
                    }}
                >
                    {({ values, handleChange, handleBlur }) => (
                        <Form>

                            <div className="div-padding">
                                <TextField
                                    name="firstName"
                                    label="First Name"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                    inputProps={{ pattern: '[a-zA-Z]+' }}
                                    helperText='Can only contain letters'

                                />
                            </div>
                            <div className="div-padding">
                                <TextField
                                    name="lastName"
                                    label="Last Name"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                    inputProps={{ pattern: '[a-zA-Z]+' }}
                                    helperText='Can only contain letters'

                                />
                            </div>
                            <div className="div-padding">
                                <TextField
                                    name="email"
                                    label="E-mail"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                    inputProps={{ pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' }}

                                    
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
                                    inputProps={{ minLength: 8, pattern: '[a-zA-Z0-9]+' }}
                                    helperText='Password must be at least 8 characters long and contain only numbers and letters.'
                                />
                            </div>

                            <Button color="primary" variant='outlined' type='submit'>Create Account</Button>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
}
export default RegisterForm

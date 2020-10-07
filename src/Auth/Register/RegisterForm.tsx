import { Button, TextField } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { Component } from "react";
import APIURL from "../../helpers/environment";
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
    
    RegisterSubmit(values: Values, submitProps: RegisterFormProps) {
        
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
                role: 'test'
            })
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                window.localStorage.setItem('token', data.sessionToken)
                submitProps.updateToken(data.sessionToken, true)
                this.setState({ submitted: true })
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
        )
    }
}
export default RegisterForm

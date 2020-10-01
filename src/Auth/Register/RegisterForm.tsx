import { Button, TextField } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as React from "react";
import RegisterSubmit from './RegisterSubmit'


interface Values {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string
}

export const RegisterForm: React.FC = () => {
    return (
        <div>
            <h1>Register</h1>
            <Formik
                initialValues={{ firstName: '', lastName: '', email: '', password: '', role: '' }}
                onSubmit={values => {
                    RegisterSubmit(values)
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
                        <div>
                            <TextField
                                name="role"
                                label="Role"
                                value={values.role}
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

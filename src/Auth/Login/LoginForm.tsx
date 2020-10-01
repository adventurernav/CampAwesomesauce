import { Button, TextField } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as React from "react";
interface Props {
    onSubmit: (values:Values) => void;
}
interface Values {
    email: string, 
    password: string
}

export const Login: React.FC<Props> = ({onSubmit}) => {
    return(
        <div>
            <h1>Login</h1>
            <Formik 
            initialValues={{email: '', password: ''}} 
            onSubmit={values=> {
                onSubmit(values);
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
                <pre>{JSON.stringify(values, null, 2)}</pre>
                </Form>
            )}
            </Formik>
        </div>
    )
}

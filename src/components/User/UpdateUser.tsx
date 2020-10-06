import React, { Component } from 'react'
import { Button, TextField } from "@material-ui/core";
import { Form, Formik } from "formik";
import APIURL from "../../helpers/environment";

interface Values {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

type UpdateUserProps = {
    appState: { authenticated: boolean, token: string | null }
}

class UpdateUser extends Component<UpdateUserProps>{
    requestHeaders: any = { 'Content-Type': 'application/json' , 'Authorization': this.props.appState.token};
    render(){
        return(
            <div>
                <h1>Update User</h1>
            <Formik
                initialValues={{ 
                    firstName: '', 
                    lastName: '', 
                    email: '', 
                    password: '' }}
                onSubmit={(values:Values) => {
                    
                        fetch(`${APIURL}/user/`, {
                            method: 'PUT',
                            headers: this.requestHeaders,
                            body: JSON.stringify({
                                firstName: values.firstName,
                                lastName: values.lastName,
                                email: values.email,
                                password: values.password
                            })
                        })
                            .then(res => res.json())
                            .then((data) => {
                                console.log(data);
                                
                            })
                            .catch(err=>console.log(err))
                    
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
                    
                        <Button type='submit'>Update Account</Button>
                    </Form>
                )}
            </Formik>
        </div>
    )}
            
}
export default UpdateUser;
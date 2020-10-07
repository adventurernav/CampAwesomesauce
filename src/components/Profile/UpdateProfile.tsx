import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import APIURL from "../../helpers/environment";
import {ProfileResults} from './ProfileInterfaces'
import { Redirect } from "react-router-dom";

interface Values {
    playaname: string,
    burnsAttended: number,
    favPrinciple: string,
    aboutMe: string,
    status: string,
    profilePic: string
}
type updateProfileProps = {
    appState: { authenticated: boolean, token: string|null },
    fetchResults: ProfileResults 
}
type UpdateState = {
submitted: boolean
}
class UpdateProfile extends Component<updateProfileProps, UpdateState> {
state={
    submitted: false
}
    requestHeaders: any = { 'Content-Type': 'application/json' , 'Authorization': this.props.appState.token};
componentDidUpdate(){
    
}
    updateProfileSubmit = (values: Values) => {
        fetch(`${APIURL}/profile/`, {
            method: 'PUT',
            headers: this.requestHeaders,
            body: JSON.stringify({
                aboutMe: values.aboutMe,
                burnsAttended: values.burnsAttended,
                favPrinciple: values.favPrinciple,
                playaname: values.playaname,
                profilePic: values.profilePic,
                status: values.status
            })
        })
            .then(res => res.json())
            .then(data=>{
                if (data.message === "Update Failed"){
                    alert(data.error.original.detail)
                }else {
                    console.log(data)
                    this.setState({submitted: true})
                    
                }
                return console.log(data)
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                {(this.state.submitted === true) ? <Redirect to="/profile" /> : null}
                <h1>Update your Profile</h1>
                <Formik
                    initialValues={{
                        playaname: this.props.fetchResults.users.playaname,
                        burnsAttended: this.props.fetchResults.users.burnsAttended,
                        favPrinciple: this.props.fetchResults.users.favPrinciple,
                        aboutMe: this.props.fetchResults.users.aboutMe,
                        status: this.props.fetchResults.users.status,
                        profilePic: this.props.fetchResults.users.profilePic
                    }}
                    onSubmit={values => {
                        this.updateProfileSubmit(values)
                    }}
                    >
                    {({ values, handleChange, handleBlur }) => (
                        <Form>

                            <div>
                                <TextField
                                    name="playaname"
                                    helperText="Playa Name"
                                    value={values.playaname}
                                    defaultValue={this.props.fetchResults.users.playaname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <div>
                                <TextField
                                    name="burnsAttended"
                                    helperText="Number of Burns Attended"
                                    value={values.burnsAttended}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <div>
                                <TextField
                                    name="aboutMe"
                                    helperText="About Me"
                                    value={values.aboutMe}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <div>
                                <TextField
                                    name="status"
                                    helperText="Status"
                                    value={values.status}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <div>
                                <TextField
                                    name="profilePic"
                                    helperText="Choose an avatar(TEMP: paste URL)"
                                    value={values.profilePic}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>

                            <div>
                                
                                <Field name='favPrinciple' as="select" helperText="Your Favorite Principle">
                                <option value="" disabled>--Your Favorite Principle--</option>
                                    <option value="Radical Inclusion">Radical Inclusion</option>
                                    <option value="Gifting">Gifting</option>
                                    <option value="Decommodification">Decommodification</option>
                                    <option value="Radical Self-reliance">Radical Self-reliance</option>
                                    <option value="Radical Self-expression">Radical Self-expression</option>
                                    <option value="Communal Effort">Communal Effort</option>
                                    <option value="Civic Responsibility">Civic Responsibility</option>
                                    <option value="Leave No Trace">Leave No Trace</option>
                                    <option value="Participation">Participation</option>
                                    <option value="Immediacy">Immediacy</option>
                                    
                                </Field>
                            </div>
                            <Button type='submit'>Update Profile</Button>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
}
export default UpdateProfile
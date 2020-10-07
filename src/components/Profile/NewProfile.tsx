import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import APIURL from "../../helpers/environment";
import { Redirect } from "react-router-dom";

interface Values {
    playaname: string,
    burnsAttended: number,
    favPrinciple: string,
    aboutMe: string,
    status: string,
    profilePic: string
}
type newProfileProps = {
     appState: { authenticated: boolean, token: string|null } 
}
type stateValues={
    submitted: boolean
}
class NewProfile extends Component<newProfileProps,stateValues> {
    state={
        submitted: false
    }
    requestHeaders: any = { 'Content-Type': 'application/json' , 'Authorization': this.props.appState.token};

    newProfileSubmit = (values: Values) => {
        let id: number = 1
        fetch(`${APIURL}/profile/register/${id}`, {
            method: 'POST',
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
            .then((data)=>{
                if (!data.error){
                    this.setState({ submitted: true})
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

                <h1>Create your Profile</h1>
                <Formik
                    initialValues={{
                        playaname: '',
                        burnsAttended: 0,
                        favPrinciple: '',
                        aboutMe: '',
                        status: '',
                        profilePic: ''
                    }}
                    onSubmit={values => {
                        this.newProfileSubmit(values)
                    }}
                    >
                    {({ values, handleChange, handleBlur }) => (
                        <Form>

                            <div>
                                <TextField
                                    name="playaname"
                                    label="Playa Name"
                                    value={values.playaname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <div>
                                <TextField
                                    name="burnsAttended"
                                    label="Number of Burns Attended"
                                    value={values.burnsAttended}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <div>
                                
                                <Field name='favPrinciple' as="select" label="Your Favorite Principle">
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
                            <div>
                                <TextField
                                    name="aboutMe"
                                    label="About Me"
                                    value={values.aboutMe}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <div>
                                <TextField
                                    name="status"
                                    label="Status"
                                    value={values.status}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <div>
                                <TextField
                                    name="profilePic"
                                    label="Choose an avatar(TEMP: enter a url)"
                                    value={values.profilePic}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>

                            <Button type='submit'>Create Profile</Button>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
}
export default NewProfile
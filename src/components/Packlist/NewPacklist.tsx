import React, { Component } from "react";
import APIURL from "../../helpers/environment";
import { Button, TextField } from "@material-ui/core";
import { Form, Formik } from "formik";


interface Values {
    title: string

}
type newPacklistProps = {
    appState: { authenticated: boolean, token: string | null }

}
type newPacklistState = {
    submitted: boolean
}

class NewPacklist extends Component<newPacklistProps> {
    constructor(props: newPacklistProps) {
        super(props)
        this.state={
            submitted: false
        }
    }
    componentDidUpdate(){
        console.log('Component Did Update')
    }
    requestHeaders: any = { 'Content-Type': 'application/json', 'Authorization': this.props.appState.token };

    newPacklistSubmit(values: Values) {
        fetch(`${APIURL}/packlist/`, {
            method: 'POST',
            headers: this.requestHeaders,
            body: JSON.stringify({
                title: values.title
            })
        })
            .then(res => res.json())
            .then(response => {
                this.setState({submitted: true})
                window.location.reload()

            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <h1>Create a new Packlist</h1>
                <Formik
                    initialValues={{
                        title: ''
                    }}
                    onSubmit={values => {
                        this.newPacklistSubmit(values)
                    }}
                >
                    {({ values, handleChange, handleBlur }) => (
                        <Form>

                            <div>
                                <TextField
                                    name="title"
                                    label="Title"
                                    value={values.title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>

                            <Button type='submit' variant="outlined" color="primary">Create Packlist</Button>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
}
export default NewPacklist;
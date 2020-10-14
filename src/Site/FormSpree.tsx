// Customize this 'myform.js' script and add it to your JS bundle.
// Then import it with 'import MyForm from "./myform.js"'.
// Finally, add a <MyForm/> element whereever you wish to display the form.

import React from "react";
import { Button, Grid, TextField } from '@material-ui/core'

type MyFormState = {
    status: string
}
export default class MyForm extends React.Component<{}, MyFormState> {
    constructor(props: any) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            status: ""
        };
    }

    render() {
        const { status } = this.state;
        return (
            <Grid container justify='center' className='max-width' >
                <form
                    onSubmit={this.submitForm}
                    action="https://formspree.io/f/mrgopape"
                    method="POST"
                    className='max-width'
                >
                    <Grid item>
                        <TextField
                            color='primary'
                            type="email"
                            name="email"
                            label="Your E-mail Address" fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            color='primary'
                            type="text"
                            name="message"
                            multiline
                            rows={3}
                            fullWidth
                            variant="outlined"
                            label="What's on your mind?"
                        />
                    </Grid>
                    {status === "SUCCESS" ? <p>Thanks!</p> : <Button color='primary' type='submit'>Submit</Button>}
                    {status === "ERROR" && <p>Ooops! There was an error.</p>}
                </form>
            </Grid>
        );
    }

    submitForm(ev: any) {
        console.log('submitform')
        ev.preventDefault();
        const form = ev.target;
        const data = new FormData(form);
        const xhr = new XMLHttpRequest();
        xhr.open(form.method, form.action);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            if (xhr.status === 200) {
                form.reset();
                this.setState({ status: "SUCCESS" });
            } else {
                this.setState({ status: "ERROR" });
            }
        };
        xhr.send(data);
    }
}
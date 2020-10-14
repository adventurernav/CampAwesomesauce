import React, { Component } from "react";
import { Link, Grid, ListItem } from "@material-ui/core";
import FacebookIcon from '@material-ui/icons/Facebook';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import FormSpree from './FormSpree'

class Contact extends Component {

    render() {
        return (
            <Grid container justify='center'>
                <Grid item>
                    <h1>Contact Us</h1>
                </Grid>
                <Grid container direction='column' justify='center'>
                    <Grid item>
                        <Link href='https://www.facebook.com/campawesomesauce/' target='_blank'><FacebookIcon fontSize='large'/></Link>
                    </Grid>
                    <Grid item>
                    <h3>-or-</h3>
                </Grid>
                </Grid>


                <FormSpree />
            </Grid>
        )
    }
}
export default Contact;


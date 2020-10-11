import React, { Component } from "react";
import { Link, List, ListItem } from "@material-ui/core";
import FacebookIcon from '@material-ui/icons/Facebook';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';

class Contact extends Component {

    render() {
        return (
            <div>
                <h1>Contact Us</h1>
                <List>
                    <ListItem>
                        <Link href='https://www.facebook.com/campawesomesauce/' target='_blank'><FacebookIcon /></Link>
                    </ListItem>
                    <ListItem>
                        <Link href='http://www.campawesomesauce.org/#' target='_blank'><EmailOutlinedIcon />  Email us </Link>
                    </ListItem>
                </List>
            </div>
        )
    }
}
export default Contact;
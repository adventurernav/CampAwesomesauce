import React, { Component } from "react";
import Banner from '../assets/pinkbanner.png'
import { Button } from "@material-ui/core";

class Home extends Component {

    render() {
        return (
            <div>
                <img src={Banner} alt="Banner"/>
                <br/>
                <br/>
                <Button href='/auth' color='primary' variant='outlined'>Login or Signup</Button> 
                <br/>               
                <br/>               
                <Button href='/resources' color='primary' variant='outlined'>Resources</Button> 
                <br/>               
                <br/>               
                <Button href='/about' color='primary' variant='outlined'>About Us</Button> 
                <br/>               
                <br/>               
                <br/>               
            </div>
        )
    }
}
export default Home;
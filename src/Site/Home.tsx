import React, { Component } from "react";
import Banner from '../assets/pinkbanner.png'
import Balls from '../assets/awesomeballs.jpg'

class Home extends Component {

    render() {
        return (
            <div>
                <img src={Banner} alt="Banner"/>
                <img src={Balls} alt="Banner"/>
            </div>
        )
    }
}
export default Home;
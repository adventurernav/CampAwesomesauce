import React, { Component } from "react";
import Banner from '../assets/pinkbanner.png'
import Balls from '../assets/awesomeballs.jpg'
import Group from '../assets/group2019.jpg'

class Home extends Component {

    render() {
        return (
            <div>
                <img src={Banner} alt="Banner"/>
                <img src={Balls} alt="Banner"/>
                <img style={{width: '80vw'}}src={Group} alt="Group"/>
            </div>
        )
    }
}
export default Home;
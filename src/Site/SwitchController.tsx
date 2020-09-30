import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from './Home'
import Auth from '../Auth/Auth'
import Packlist from '../components/Packlist/Packlist'
import Profile from '../components/Profile/Profile'
class SwitchController extends Component {

    render() {
        return (

            <div>
                <Switch>
                    <Route exact path="/"><Home /></Route>
                    <Route exact path="/auth"><Auth /></Route>
                    <Route exact path="/packlist"><Packlist /></Route>
                    <Route exact path="/profile"><Profile /></Route>

                </Switch>
            </div>
        )
    }
}
export default SwitchController;
import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Auth from '../Auth/Auth'
import Packlist from '../components/Packlist/Packlist'
import Profile from '../components/Profile/Profile'
import User from '../components/User/User'
import Logout from "../Auth/Logout";
import NewProfile from "../components/Profile/NewProfile";
import Dashboard from './Dashboard'
import Contact from "./Contact";
import About from "./About";
import Donate from "./Donate";
import Resources from "./Resources";
import Admin from "../components/Admin/Admin";

type controllerState = {

}
type ControllerProps = {
    updateToken: (token: string, authenticated: boolean) => void,
    updateAdmin: (admin: boolean) => void,
    appState: { authenticated: boolean, token: string | null, admin: boolean }
}

class SwitchController extends Component<ControllerProps, controllerState> {

  

    render() {
        return (

            <div>
                <Switch>
                    <Route exact path="/"><Home /></Route>
                    <Route exact path="/admin"><Admin appState={this.props.appState}/></Route>
                    <Route exact path="/dashboard"><Dashboard appState={this.props.appState}/></Route>
                    <Route exact path="/resources"><Resources /></Route>
                    <Route exact path="/contact"><Contact /></Route>
                    <Route exact path="/about"><About /></Route>
                    <Route exact path="/donate"><Donate /></Route>
                    <Route exact path="/auth">
                        <Auth updateToken={this.props.updateToken} updateAdmin={this.props.updateAdmin} appState={this.props.appState} />
                    </Route>
                    <Route exact path="/logout"><Logout updateAdmin={this.props.updateAdmin}updateToken={this.props.updateToken} /></Route>
                    <Route exact path="/packlist"><Packlist appState={this.props.appState} /></Route>
                    <Route exact path="/profile"><Profile appState={this.props.appState} /></Route>
                    <Route exact path="/account"><User appState={this.props.appState} /></Route>
                    <Route exact path="/profile/new"><NewProfile appState={this.props.appState} /></Route>


                </Switch>
            </div>
        )
    }
}
export default SwitchController;
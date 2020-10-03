import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Auth from '../Auth/Auth'
import Packlist from '../components/Packlist/Packlist'
import Profile from '../components/Profile/Profile'

type controllerState = {

}
type ControllerProps = {
    updateToken: (token: string, authenticated: boolean) => void
    appState: { authenticated: boolean, token: string|null }
}

class SwitchController extends Component<ControllerProps, controllerState> {

    constructor(props: ControllerProps) {
        super(props)
    }

    render() {
        return (

            <div>
                <Switch>
                    <Route exact path="/"><Home /></Route>
                    <Route exact path="/auth"><Auth updateToken={this.props.updateToken} /></Route>
                    <Route exact path="/packlist"><Packlist /></Route>
                    <Route exact path="/profile"><Profile appState={this.props.appState} /></Route>

                </Switch>
            </div>
        )
    }
}
export default SwitchController;
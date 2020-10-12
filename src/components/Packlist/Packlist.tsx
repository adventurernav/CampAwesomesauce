import React, { Component } from "react";
import GetPacklist from './GetPacklist'


type PacklistProps = {
    appState: {authenticated: boolean, token: string|null}
}

class Packlist extends Component<PacklistProps> {


refrFunc(newState: boolean): void {
  }
    render() {
        return (
            <div>
                <div id="packlist-info">

                <h1>My Packlists</h1>
                <p>Here you can create different packlists for your next trip. You can add all your items to your packlist and update them as you make purchases or start packing. You can also remove items from your packlist or delete a packlist entirely.</p>
                </div>
                <GetPacklist appState={this.props.appState} /> 
                               
            </div>
        )
    }
}
export default Packlist;
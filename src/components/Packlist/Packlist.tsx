import React, { Component } from "react";
import GetPacklist from './GetPacklist'


type PacklistProps = {
    appState: {authenticated: boolean, token: string|null}
}

class Packlist extends Component<PacklistProps> {

    render() {
        return (
            <div>
                <h1>Packlist</h1>
                <GetPacklist appState={this.props.appState} /> 
                               
            </div>
        )
    }
}
export default Packlist;
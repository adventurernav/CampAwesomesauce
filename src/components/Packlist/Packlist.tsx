import React, { Component } from "react";
import GetPacklist from './GetPacklist'


type PacklistProps = {
    appState: {authenticated: boolean, token: string|null}
}
type PacklistState = {
    refresh: boolean
}
class Packlist extends Component<PacklistProps,PacklistState> {
state={
    refresh: false
}
componentDidUpdate(){
    console.log('Component Did Update')
}
    render() {
        return (
            <div>
                <h1>Packlist</h1>
                <GetPacklist appState={this.props.appState} refresh={this.state.refresh} /> 
                               
            </div>
        )
    }
}
export default Packlist;
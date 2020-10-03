import React, { Component } from "react";
import GetPacklist from './GetPacklist'
import NewPacklist from "./NewPacklist";
import VerticalTabs from "./Tabs";
import UpdatePacklist from "./UpdatePacklist";

type PacklistProps = {
    appState: {authenticated: boolean, token: string|null}
}

class Packlist extends Component<PacklistProps> {
constructor(props: PacklistProps){
    super(props)
    console.log(props);
    
}
    render() {
        return (
            <div>
                <h1>Packlist</h1>
                <GetPacklist appState={this.props} /> 
                {/* <NewPacklist />
                <UpdatePacklist /> */}
                
            </div>
        )
    }
}
export default Packlist;
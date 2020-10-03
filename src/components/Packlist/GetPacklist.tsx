import React, { Component } from "react";
import APIURL from '../../helpers/environment'
import { PacklistResults } from './PacklistInterfaces'
import VerticalTabs from './Tabs'

type getPacklistProps = {
    appState: { appState: { authenticated: boolean, token: string | null } }
}

class GetPacklist extends Component<getPacklistProps, PacklistResults> {
    constructor(props: getPacklistProps) {
        super(props)
        this.state = {
            title: '',
            id: 0
        }
        console.log(props);
        
    }
    token: string | null = this.props.appState.appState.token
    requestHeaders: any = { 'Content-Type': 'application/json', 'Authorization': this.token };

    componentDidMount() {
        this.packlistFetch()
    }
    packlistFetch = (): any => {

        fetch(`${APIURL}/packlist/`, {
            method: 'GET',
            headers: this.requestHeaders
        })
            .then(res => res.json())
            .then((data: PacklistResults) => {
                console.log(data);
                
                this.setState({
                    title: data.title
                })
                return data
            })
            .then(() => console.log(this.state))
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                <h1>Get Packlists</h1>
                <p>this is where the info will get fed into the tabs</p>
                <VerticalTabs appState={this.props} />
            </div>
        )
    }
}
export default GetPacklist;
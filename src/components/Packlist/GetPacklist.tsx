import React, { Component } from "react";
import APIURL from '../../helpers/environment'
import VerticalTabs from './Tabs'
type getPacklistProps = {
    appState: { appState: { authenticated: boolean, token: string | null } }
}
export interface PacklistState {
    data: packlistObject[]
}
type packlistKeys = {
    id: number,
    title: string
}
type packlistObject = {
    [index: number]: packlistKeys
}

class GetPacklist extends Component<getPacklistProps, PacklistState> {

    state: PacklistState = {
        data: []
    }
    token: string | null = this.props.appState.appState.token
    requestHeaders: any = { 'Content-Type': 'application/json', 'Authorization': this.token };
    componentDidMount() {
        this.packlistFetch()
    }
    componentDidUpdate() {
        console.log(this.state);
    }
    packlistFetch = (): void => {
        fetch(`${APIURL}/packlist/`, {
            method: 'GET',
            headers: this.requestHeaders
        })
            .then(res => res.json())
            .then((results) => {
                console.log(`get fetch results:`, results);
                this.setState({
                    data: results
                }, () => console.log(`THIS.STATE in the callback function`, this.state))
            })
            .then(() => console.log(`this.state in the next .then() `, this.state))
            .catch(err => console.log(err))
    }
    render() {

        return (
            <div>
                <VerticalTabs appState={this.props} PacklistState={this.state} />
            </div>
        )
    }
}
export default GetPacklist;
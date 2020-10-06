import React, { Component } from "react";
import APIURL from '../../helpers/environment'
import VerticalTabs from './Tabs'
type getPacklistProps = {
    appState:{ authenticated: boolean, token: string | null }
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
    requestHeaders: any = { 'Content-Type': 'application/json', 'Authorization': this.props.appState.token };
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
                this.setState({
                    data: results
                }, () => console.log(`THIS.STATE in the callback function`, this.state))
            })
            .catch(err => console.log(err))
    }
    render() {

        return (
            <div>
                <VerticalTabs appState={this.props.appState} PacklistState={this.state} />
            </div>
        )
    }
}
export default GetPacklist;
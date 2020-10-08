import React, { Component } from "react";
import APIURL from '../../helpers/environment'
import VerticalTabs from './Tabs'
type getPacklistProps = {
    appState:{ authenticated: boolean, token: string | null },
    refresh: (newState:boolean) => void,
    refreshState: boolean
}
export interface PacklistState {
    data: packlistObject[]
}

type packlistObject = {
    id: number,
    title: string
    // [index: number]: packlistKeys
}

class GetPacklist extends Component<getPacklistProps, PacklistState> {

    state: PacklistState = {
        data: []
    }
    requestHeaders: any = { 'Content-Type': 'application/json', 'Authorization': this.props.appState.token };
    componentDidMount() {
        this.packlistFetch()
    }
    componentDidUpdate(){
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
                })

            })
            .catch(err => console.log(err))
    }
    render() {

        return (
            <div>
                <VerticalTabs appState={this.props.appState} PacklistState={this.state} refresh={this.props.refresh} refreshState={this.props.refreshState} />
            </div>
        )
    }
}
export default GetPacklist;
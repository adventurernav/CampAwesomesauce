
import { Button } from "@material-ui/core";
import React, { Component } from "react";
import APIURL from '../../../helpers/environment'
import ItemTable from "./ItemTable";
import NewItem from "./NewItem";

type PLitemProps = {
    plID: number,
    appState: { authenticated: boolean, token: string | null },
}

type itemObject = {
    id: number,
    itemName: string,
    isOwned: boolean,
    isPacked: boolean,
    qty: number
}

export interface PLitemState {
    data: itemObject[]

}
class GetPacklist extends Component<PLitemProps, PLitemState> {
    state = {
        data: []
    }

    requestHeaders: any = { 'Content-Type': 'application/json', 'Authorization': this.props.appState.token };
    componentDidMount() {
        this.itemsFetch()
    }
    componentDidUpdate() {
    }
    itemsFetch = (): void => {
        fetch(`${APIURL}/item/${this.props.plID}`, {
            method: 'GET',
            headers: this.requestHeaders
        })
            .then(res => res.json())
            .then((results) => {
                this.setState({ data: results })
            })
            
            .catch(err => console.log(err))
    }
    render() {

        return (
            <div>
                <NewItem appState={this.props.appState} plID={this.props.plID}  />
                <ItemTable items={this.state.data} appState={this.props.appState} plID={this.props.plID}  />
            </div>
        )
    }
}
export default GetPacklist;
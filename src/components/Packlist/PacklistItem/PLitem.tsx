
import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import APIURL from '../../../helpers/environment'
import ItemTable from "./ItemTable";

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

    componentDidMount() {
        this.itemsFetch()
    }
    componentDidUpdate() {
    }
    itemsFetch = (): void => {
        if(this.props.appState.token!==null){

        fetch(`${APIURL}/item/${this.props.plID}`, {
            method: 'GET',
            headers: new Headers({'Content-Type': 'application/json' , Authorization: this.props.appState.token}),        })
            .then(res => res.json())
            .then((results) => {
                this.setState({ data: results })
            })

            .catch(err => console.log(err))
    }}
    render() {

        return (
            <div>
                <Grid container direction='column'>
                        <ItemTable items={this.state.data} appState={this.props.appState} plID={this.props.plID} />
                </Grid>
            </div>
        )
    }
}
export default GetPacklist;
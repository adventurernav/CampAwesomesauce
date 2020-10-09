import React, { Component } from "react";
import { Button } from '@material-ui/core'
import APIURL from "../../../helpers/environment";

type DelProps = {
    itemID: number,
    appState: { authenticated: boolean, token: string | null },
    refresh: (newState:boolean) => void,
    refreshState: boolean
}
class DeleteItem extends Component<DelProps> {
   

    requestHeaders: any = { 'Content-Type': 'application/json', 'Authorization': this.props.appState.token };
    
    submitClick = () => {
        this.delPacklistFetch();
    }
    delPacklistFetch = (): any => {
        fetch(`${APIURL}/item/${this.props.itemID}`, {
            method: 'DELETE',
            headers: this.requestHeaders
        })
            .then(res => res.json())
            .then(response => {
                if (!response.error) {
                    window.location.reload()
                    // this.props.refresh(!this.props.refreshState)
                } else {
                    alert(`${response.error.errors[0].message}`)
                }
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                <Button color="secondary" onClick={this.submitClick}>Delete this Item</Button>
                <hr />
            </div>
        )
    }
}
export default DeleteItem;
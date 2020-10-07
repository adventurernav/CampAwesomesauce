import React, { Component } from "react";
import { Button } from '@material-ui/core'
import APIURL from "../../helpers/environment";

type DelProps = {
    plID: number,
    appState: { authenticated: boolean, token: string | null },
    refresh: (newState:boolean) => void,
    refreshState: boolean
}
class DeletePacklist extends Component<DelProps> {
   

    requestHeaders: any = { 'Content-Type': 'application/json', 'Authorization': this.props.appState.token };
    componentDidUpdate() {
        console.log('Component Did Update')
    }
    delPacklistFetch = (): any => {
        fetch(`${APIURL}/packlist/${this.props.plID}`, {
            method: 'DELETE',
            headers: this.requestHeaders
        })
            .then(res => res.json())
            .then(response => {
                if (!response.error) {
                    console.log('Success, need to refresh to show changes')
                    // window.location.reload()
                    this.props.refresh(!this.props.refreshState)
                } else {
                    alert(`${response.error.errors[0].message}`)
                }
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                <Button color="secondary" onClick={this.delPacklistFetch}>Delete this Packlist</Button>
                <hr />
            </div>
        )
    }
}
export default DeletePacklist;
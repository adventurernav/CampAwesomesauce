import { Button } from "@material-ui/core";
import React, { Component } from "react";
import APIURL from '../../helpers/environment'

type delProfileProps = {
    appState: { appState: { authenticated: boolean, token: string|null } }
}
class DeleteProfile extends Component<delProfileProps> {

    token:string|null = this.props.appState.appState.token
    requestHeaders: any = { 'Content-Type': 'application/json' , 'Authorization': this.token};

    
    delProfileFetch = (): any => {
        let id:number = 1; //this should be the user's ID
        fetch(`${APIURL}/profile/${id}`, {
            method: 'DELETE',
            headers: this.requestHeaders
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                <br />
                <Button color="secondary" onClick={this.delProfileFetch}>Delete My Profile</Button>
            </div>
        )
    }
}
export default DeleteProfile;
import { Button } from "@material-ui/core";
import React, { Component } from "react";
import APIURL from '../../helpers/environment'

type delUserProps = {
    appState: { authenticated: boolean, token: string|null } 
}
class DeleteUser extends Component<delUserProps> {

    requestHeaders: any = { 'Content-Type': 'application/json' , 'Authorization': this.props.appState.token};

    
    delUser = (): any => {
        fetch(`${APIURL}/user/`, {
            method: 'DELETE',
            headers: this.requestHeaders
        })
            .then(res => res.json())
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                <br />
                <Button color="secondary" onClick={this.delUser}>Delete My Account</Button>
            </div>
        )
    }
}
export default DeleteUser;
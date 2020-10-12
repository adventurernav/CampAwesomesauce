import { Button } from "@material-ui/core";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import APIURL from '../../helpers/environment'

type delUserProps = {
    appState: { authenticated: boolean, token: string|null } 
}
type delUserState = {
submitted: boolean
}
class DeleteUser extends Component<delUserProps> {
state={
    submitted:false
}
    requestHeaders: any = { 'Content-Type': 'application/json' , 'Authorization': this.props.appState.token};

    
    delUser = (): any => {
        fetch(`${APIURL}/user/`, {
            method: 'DELETE',
            headers: this.requestHeaders
        })
            .then(res => res.json())
            .then(data=>{
                if (!data.error){
                    this.setState({submitted:true})
                    alert('Your account has been permanently deleted.')
                } else{
                    alert(`${data.error.errors[0].message}`)
                }
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                {this.state.submitted===true? <Redirect to='/logout'/>:null}
                <br />
                <Button color="secondary" onClick={this.delUser}>Delete My Account</Button>
            </div>
        )
    }
}
export default DeleteUser;
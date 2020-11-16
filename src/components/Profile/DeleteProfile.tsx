import { Button } from "@material-ui/core";
import React, { Component } from "react";
import APIURL from '../../helpers/environment'
import {Redirect} from 'react-router-dom'

type delProfileProps = {
    appState: { authenticated: boolean, token: string|null } 
}
type delState={
    submitted: boolean
}
class DeleteProfile extends Component<delProfileProps,delState> {
state={
    submitted: false
}

    
    delProfileFetch = (): void => {
        if(this.props.appState.token!==null){

        fetch(`${APIURL}/profile/`, {
            method: 'DELETE',
            headers: new Headers({'Content-Type': 'application/json' , Authorization: this.props.appState.token}),        })
            .then(res => res.json())
            .then(data=>{
                console.log(data)
                if (!data.error){
                    // this.setState({submitted:true})
                } else{
                    console.log('success?')
                    // alert(`${data.error.errors[0].message}`)
                }
            })

            .catch(err => console.log(err))
    }}
    render() {
        return (
            <div>
                {this.state.submitted===true? <Redirect to='/profile/new'/>:null}
                <br />
                <Button color="secondary" onClick={this.delProfileFetch}>Delete My Profile</Button>
            </div>
        )
    }
}
export default DeleteProfile;
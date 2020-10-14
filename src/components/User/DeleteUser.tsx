import { Button, DialogTitle, DialogActions, Dialog } from "@material-ui/core";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import APIURL from '../../helpers/environment'

type delUserProps = {
    appState: { authenticated: boolean, token: string|null } 
}
type delUserState = {
    open: boolean,
submitted: boolean
}
class DeleteUser extends Component<delUserProps, delUserState> {
state={
    open: false,
    submitted:false
}
    requestHeaders: any = { 'Content-Type': 'application/json' , 'Authorization': this.props.appState.token};
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    
    delUser = (): void => {
        fetch(`${APIURL}/user/`, {
            method: 'DELETE',
            headers: this.requestHeaders
        })
            .then(res => res.json())
            .then(data=>{
                if (!data.error){
                    this.setState({submitted:true})
                    alert('Your account has been permanently deleted.')
                    this.handleClose()
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
                <Dialog open={this.state.open} onClose={this.handleClose} >
                    <DialogTitle>Are you sure you want to delete your ENTIRE account? This cannot be undone.</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.delUser} color="primary">
                        Yes, Delete My Account Forever
                        </Button>
                    </DialogActions>
                </Dialog>
                <Button color="secondary" onClick={this.handleOpen}>Delete My Account</Button>
            </div>
        )
    }
}
export default DeleteUser;
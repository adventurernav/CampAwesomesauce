import { Button, DialogTitle, DialogActions, Dialog } from "@material-ui/core";
import React, { Component } from "react";
import APIURL from '../helpers/environment'


type delProps = {
    appState: { authenticated: boolean, token: string|null } ,
    path: string, 
    buttonLabel: string, 
    confirmLabel: string,
    title: string}
type delState = {
    open: boolean,
}
class DeleteModal extends Component<delProps, delState> {
state={
    open: false
}
    
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    
    delFetch = ():void => {
       if (this.props.appState.token) {
            fetch(`${APIURL}/${this.props.path}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json' , 
                Authorization: this.props.appState.token
            })
        })
            .then(res => res.json())
            .then(data=>{
                if (!data.error){
                    alert('This was permanently deleted.')
                    this.handleClose()
                    window.location.reload()
                } else{
                    alert(`${data.error.errors[0].message}`)
                }
            })
            .catch(err => console.log(err))}
    }
    render() {
        return (
            <div>
                <Dialog open={this.state.open} onClose={this.handleClose} >
                    <DialogTitle>{this.props.title}</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.delFetch} color="primary">
                        {this.props.confirmLabel}
                        </Button>
                    </DialogActions>
                </Dialog>
                <Button color="secondary" onClick={this.handleOpen}>{this.props.buttonLabel}</Button>
            </div>
        )
    }
}
export default DeleteModal;
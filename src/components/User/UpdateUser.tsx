import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@material-ui/core";
import { EditOutlined } from "@material-ui/icons";
import React, { Component } from "react";
import APIURL from "../../helpers/environment";

type UpdateUserProps = {
    appState: { authenticated: boolean, token: string | null },
    textKey: string,
    currentValue: string
}
type UpdateState = {
    newText: string,
    open: boolean
}
class UpdateUser extends Component<UpdateUserProps, UpdateState> {
    state = {
        newText: this.props.currentValue,
        open: false
    }
    password: string = this.props.textKey==='password'? 'password' : ''
    dialogContentController = () => {
        if (this.props.textKey === 'firstName' || this.props.textKey === 'lastName') {
            return (<TextField
                autoFocus
                label={this.props.textKey}
                type='text'
                fullWidth
                variant="outlined"
                value={this.state.newText}
                onChange={(e) => {
                    this.handleChange(e);
                }}
            />)
        } else if (this.props.textKey === 'email' || this.props.textKey === 'password') {
            return (<TextField
                autoFocus
                label={this.props.textKey}
                type={this.props.textKey}
                fullWidth
                variant="outlined"
                value={this.state.newText}
                onChange={(e) => {
                    this.handleChange(e);
                }}
            />)
        } else { console.log('Nothing Found') }

    }
    UpdateUserSubmit = ():void => {
        if(this.props.appState.token!==null){

        fetch(`${APIURL}/user/${this.password}`, {
            method: 'PUT',
            headers: new Headers({'Content-Type': 'application/json' , Authorization: this.props.appState.token}),            body: JSON.stringify({
                [this.props.textKey]: this.state.newText
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.message === "Update Failed") {
                    alert(data.error.original.detail)
                    throw new Error('Account not updated')
                } else {
                    this.handleClose();
                }
            })
            .catch(err => console.log(err))
    }}
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleCancel = () => {
        this.setState({ newText: this.props.currentValue });
        this.handleClose()
    };
    handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const val = e.target.value
        e.persist();
        this.setState({ newText: val });
    }
    submitClick = () => {
        this.UpdateUserSubmit();
    }
    render() {
        return (
            <div>
                {this.state.newText}

                <IconButton color='secondary' onClick={this.handleOpen}><EditOutlined /></IconButton>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Update Account</DialogTitle>
                    <DialogContent>
                        {this.dialogContentController()}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCancel} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.submitClick} color="primary">
                            Submit Changes
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }
}
export default UpdateUser;
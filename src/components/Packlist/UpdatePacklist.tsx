import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { EditOutlined } from "@material-ui/icons";

import APIURL from "../../helpers/environment";



type UpProps = {
    plID: number,
    appState: { authenticated: boolean, token: string | null },
    
}
type UpState = {
    open: boolean,
    newTitle: string,
}
class UpdatePacklist extends Component<UpProps, UpState> {
    state = {
        open: false,
        newTitle: '',
    }
    requestHeaders: any = { 'Content-Type': 'application/json', 'Authorization': this.props.appState.token };
    submitClick = () => {
        this.handleClose();
        this.handleUpdateFetch();
    }
    handleUpdateFetch = () => {
        fetch(`${APIURL}/packlist/${this.props.plID}`, {
            method: 'PUT',
            headers: this.requestHeaders,
            body: JSON.stringify({
                title: this.state.newTitle
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === "Update Failed") {
                    alert(data.error.original.detail)
                } else {
                    window.location.reload()
                }

            })
            .catch(err => console.log(err))
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.setState({
            newTitle: e.target.value
        });
    }
    render() {
        return (
            <div>
                <Button color="secondary" onClick={this.handleClickOpen}><EditOutlined /></Button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Update Packlist Title</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a new title for this packlist:
            </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="newpacklisttitle"
                            label="Title"
                            type="text"
                            fullWidth
                            value={this.state.newTitle}
                            onChange={this.handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
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
export default UpdatePacklist;
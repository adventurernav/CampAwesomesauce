import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import APIURL from "../../helpers/environment";
import { EditOutlined } from "@material-ui/icons";



type UpProps = {
    userID: number,
    appState: { authenticated: boolean, token: string | null },
    textKey: string,
    currentValue: number | string,
    path: string
}
type UpState = {
    open: boolean,
    newText: string|number
}
class AdminUpdate extends Component<UpProps, UpState> {
    state = {
        open: false,
        newText: this.props.currentValue
    }
    requestHeaders: any = { 'Content-Type': 'application/json', 'Authorization': this.props.appState.token };
    submitClick = () => {
        this.handleUpdateFetch();
    }
    handleUpdateFetch = () => {
        console.log(`${APIURL}/admin/${this.props.path}/${this.props.userID}`)
        console.log(this.props.textKey)
        console.log(this.state.newText)

        fetch(`${APIURL}/admin/${this.props.path}/${this.props.userID}`, {
            method: 'PUT',
            headers: this.requestHeaders,
            body: JSON.stringify({
                [this.props.textKey]: this.state.newText
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.message === "Update Failed") {
                    alert(data.error.original.detail)
                    throw new Error('User not updated') 
                } else if (data.NumberOfUsersUpdated[0]===0){
                    throw new Error('User not updated')
                }
                else {
                    console.log('Fetch ran?');
                    this.handleClose();
                }
            })
            .catch(err => console.log(err))
    }
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const val = e.target.value
        console.log(val)
        e.persist();
        this.setState({newText: val});
    }
    render() {
        return (
            <div>
                {this.state.newText}
                <IconButton color='secondary' onClick={this.handleOpen}><EditOutlined /></IconButton>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Update User</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label={this.props.textKey}
                            type='text'
                            fullWidth
                            value={this.state.newText}
                            onChange={(e) => {
                                this.handleChange(e);
                            }}
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
export default AdminUpdate;
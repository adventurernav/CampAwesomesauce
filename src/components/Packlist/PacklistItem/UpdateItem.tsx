import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import APIURL from "../../../helpers/environment";
import { EditOutlined } from "@material-ui/icons";



type UpProps = {
    itemID: number,
    appState: { authenticated: boolean, token: string | null },
    textKey: string,
    currentValue: number | string,
}
type UpState = {
    open: boolean,
    newText: string|number
}
class UpdateItem extends Component<UpProps, UpState> {
    state = {
        open: false,
        newText: this.props.currentValue
    }
    requestHeaders: any = { 'Content-Type': 'application/json', 'Authorization': this.props.appState.token };
    submitClick = () => {
        this.handleUpdateFetch();
    }
    handleUpdateFetch = () => {
        fetch(`${APIURL}/item/${this.props.itemID}`, {
            method: 'PUT',
            headers: this.requestHeaders,
            body: JSON.stringify({
                [this.props.textKey]: this.state.newText
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === "Update Failed") {
                    alert(data.error.original.detail)
                    throw new Error('Item not updated')
                } else {
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
    handleChange = (e: any) => {
        const val = e.target.value
        e.persist();
        this.setState({newText: val});
    }
    render() {
        return (
            <div>
                {this.state.newText}
                <IconButton color='secondary' onClick={this.handleOpen}><EditOutlined /></IconButton>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Update Item</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label={this.props.textKey==='qty'? 'Quantity':'Item'}
                            type={this.props.textKey==='qty'? 'number':'text'}
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
export default UpdateItem;
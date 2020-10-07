import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


type UpProps = {
    plID: number,
    appState: { authenticated: boolean, token: string | null },
    refresh: (newState:boolean) => void,
    refreshState: boolean
}
type UpState = {
    open: boolean,
    textFieldValue: string
}
class UpdatePacklist extends Component<UpProps, UpState> {
    state = {
        open: false,
        textFieldValue: ''
    }
    handleUpdateFetch = () => {
        this.handleClose();

    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleChange = (e: any) => {
        this.setState({
            textFieldValue: e.target.value
        });
    }
    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Update Packlist Title
        </Button>
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
                            value={this.state.textFieldValue}
                            onChange={this.handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
            </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Submit Changes
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
export default UpdatePacklist;
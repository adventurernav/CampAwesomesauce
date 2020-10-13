import { MenuItem, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@material-ui/core";
import { EditOutlined } from "@material-ui/icons";
import React, { Component } from "react";
import APIURL from "../../helpers/environment";


const principles = ['Radical Inclusion', 'Radical Inclusion', 'Gifting', 'Decommodification', 'Radical Self-reliance', 'Radical Self-expression', 'Communal Effort', 'Civic Responsibility', 'Leave No Trace', 'Participation', 'Immediacy'];

type updateProfileProps = {
    appState: { authenticated: boolean, token: string | null },
    textKey: string,
    currentValue: string | number
}
type UpdateState = {
    newText: string | number,
    open: boolean
}
class UpdateProfile extends Component<updateProfileProps, UpdateState> {
    state = {
        newText: this.props.currentValue,
        open: false
    }
    requestHeaders: any = { 'Content-Type': 'application/json', 'Authorization': this.props.appState.token };
    dialogContentController = () => {
        if (this.props.textKey === 'playaname' || this.props.textKey === 'burnsAttended' || this.props.textKey === 'status') {
            return (<TextField
                autoFocus
                label={this.props.textKey}
                type={this.props.textKey === 'burnsAttended' ? 'number' : 'text'}
                fullWidth
                variant="outlined"

                value={this.state.newText}
                onChange={(e) => {
                    this.handleChange(e);
                }}
            />)
        } else if (this.props.textKey === 'favPrinciple') {
            return (<TextField
                id={this.props.textKey}
                select
                label="Select"
                variant="outlined"
                color='primary'
                value={this.state.newText}
                onChange={this.handleChange}
            >
                <MenuItem disabled value=''>--Select One--</MenuItem>
                {principles.map((principle) => (
                    <MenuItem key={principle[0]} value={principle}>
                        {principle}
                    </MenuItem>
                ))}
            </TextField>)
        } else if (this.props.textKey === 'aboutMe') {
            return (<TextField
                autoFocus
                label={this.props.textKey}
                type='text'
                multiline
                fullWidth
                variant="outlined"

                value={this.state.newText}
                onChange={(e) => {
                    this.handleChange(e);
                }}
            />)
        } else { console.log('Nothing Found') }

    }
    updateProfileSubmit = () => {
        fetch(`${APIURL}/profile/`, {
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
                    throw new Error('Profile not updated')
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
    handleCancel = () => {
        this.setState({ newText: this.props.currentValue });
        this.handleClose()
    };
    handleChange = (e: any) => {
        const val = e.target.value
        e.persist();
        this.setState({ newText: val });
    }
    submitClick = () => {
        this.updateProfileSubmit();
    }
    render() {
        return (
            <div>
                {this.state.newText}

                <IconButton color='secondary' onClick={this.handleOpen}><EditOutlined /></IconButton>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Update Profile</DialogTitle>
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
export default UpdateProfile;
import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { EditOutlined } from "@material-ui/icons";
import APIURL from "../../helpers/environment";
import { ProfileResults } from './ProfileInterfaces'
import UpdateAvatar from './UpdateAvatar'
import { FormControl, Select, MenuItem, InputLabel } from "@material-ui/core";


const principles = ['Radical Inclusion', 'Radical Inclusion', 'Gifting', 'Decommodification', 'Radical Self-reliance', 'Radical Self-expression', 'Communal Effort', 'Civic Responsibility', 'Leave No Trace', 'Participation', 'Immediacy'];

type updateProfileProps = {
    appState: { authenticated: boolean, token: string | null },
    fetchResults: ProfileResults,
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
    componentDidMount() {
        console.log('mount')
        console.log(this.props.currentValue)
        console.log(`TEXT KEY ${this.props.textKey}`)
    }
    dialogContentController = () => {
        if (this.props.textKey === 'playaname' || this.props.textKey === 'burnsAttended' || this.props.textKey === 'status' || this.props.textKey === 'aboutMe') {
            console.log(this.props.textKey)
            return (<TextField
                autoFocus
                margin="dense"
                label={this.props.textKey}
                type={this.props.textKey === 'burnsAttended' ? 'number' : 'text'}
                fullWidth
                value={this.state.newText}
                onChange={(e) => {
                    this.handleChange(e);
                }}
            />)
        } else if (this.props.textKey === 'favPrinciple') {
            console.log(this.props.textKey)
            return (<TextField
                id={this.props.textKey}
                select
                label="Select"
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
        } else {console.log('Nothing Found')}

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
                if (data.message === "Update Failed") {
                    alert(data.error.original.detail)
                    throw new Error('Profile not updated')
                } else {
                    console.log('Fetch ran?');
                    this.handleClose();
                }
            })
            .catch(err => console.log(err))
    }
    handleOpen = () => {
        this.setState({ open: true });
        console.log(this.props.textKey)
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleChange = (e: any) => {
        const val = e.target.value
        console.log(val)
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
export default UpdateProfile;
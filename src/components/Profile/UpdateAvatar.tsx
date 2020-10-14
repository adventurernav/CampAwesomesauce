import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@material-ui/core";
import { EditOutlined } from "@material-ui/icons";
import React, { Component } from "react";
import APIURL from "../../helpers/environment";
import Avatars from './Avatars'

type updateProfileProps = {
    appState: { authenticated: boolean, token: string | null },
    currentValue: string
}
type UpdateState = {
    newText: string,
    open: boolean
}
class UpdateProfile extends Component<updateProfileProps, UpdateState> {
    state = {
        newText: this.props.currentValue,
        open: false
    }
    updateProfileSubmit = ():void => {
        if(this.props.appState.token!==null){

        fetch(`${APIURL}/profile/`, {
            method: 'PUT',
            headers: new Headers({'Content-Type': 'application/json' , Authorization: this.props.appState.token}),            body: JSON.stringify({
                profilePic: this.state.newText
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === "Update Failed") {
                    alert(data.error.original.detail)
                    throw new Error('Profile not updated')
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
                <img src={this.state.newText} alt="Avatar" style={{ height: '50px' }} />
                <IconButton color='secondary' onClick={this.handleOpen}><EditOutlined /></IconButton>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Update Profile</DialogTitle>
                    <DialogContent>   
                        <div role="group" aria-labelledby="my-radio-group">
                            {Avatars.map((avatar, i) => {
                                return (<div className='avatar-radios-div'>
                                    <label key={i} >
                                        
                                        <img src={avatar} alt={avatar} className='avatar' />
                                        <input className='avatar-radios' type='radio' name='avatar' value={avatar}/>
                                    </label>
                                </div>)
                            })}
                        </div>
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
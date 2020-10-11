import React, { Component } from "react";
import APIURL from "../../../helpers/environment";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Switch, FormGroup, FormControlLabel, IconButton } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

type NewItemProps = {
    plID: number,
    appState: { authenticated: boolean, token: string | null },
    
}
type NewItemState = {

    itemName: string,
    qty: number,
    isOwned: boolean,
    isPacked: boolean,

    open: boolean,
}

class NewItem extends Component<NewItemProps, NewItemState> {
    constructor(props: NewItemProps) {
        super(props)
        this.state = {
            itemName: '',
            qty: 0,
            isOwned: false,
            isPacked: false,
            open: false,
        }
        this.newItemSubmit = this.newItemSubmit.bind(this)
    }
    requestHeaders: any = { 'Content-Type': 'application/json', 'Authorization': this.props.appState.token };

    newItemSubmit() {
        console.log(this.props.plID);
        console.log('newItemSubmit()')
        fetch(`${APIURL}/item/${this.props.plID}`, {
            method: 'POST',
            headers: this.requestHeaders,
            body: JSON.stringify({
                itemName: this.state.itemName,
                isOwned: this.state.isOwned,
                isPacked: this.state.isPacked,
                qty: this.state.qty,
            })
        })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                window.location.reload()
            })
            .catch(err => console.log(err))
    }
    componentDidUpdate() {
        console.log('Component Did Update')
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleChangeDesc = (e: any) => {
        this.setState({
            itemName: e.target.value
        })
    }
    handleChangeQty =(e:any) => {
        this.setState({
            qty: e.target.value
        })
    }
    handleChangePack =(e:any) => {
        this.setState({
            isPacked: e.target.checked
        })
    }
    handleChangeOwn =(e:any) => {
        this.setState({
            isOwned: e.target.checked
        })
    }
    render() {
        return (
            <div>
                <IconButton color="primary" onClick={this.handleClickOpen}><AddCircleOutlineOutlinedIcon/></IconButton>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create Item</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Fill in all the details of your new item:
                        </DialogContentText>
                        <FormGroup>
                            <TextField
                                autoFocus
                                name="itemName"
                                id="itemName"
                                label="Item Description"
                                fullWidth
                                onChange={this.handleChangeDesc}

                            />
                            <TextField
                                name="qty"
                                id="qty"
                                label="Quantity"
                                type="number"
                                fullWidth
                                onChange={this.handleChangeQty}
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.isPacked}
                                        name="isPacked"
                                        inputProps={{ 'aria-label': 'isPacked' }}
                                        onChange={this.handleChangePack}

                                    />
                                }
                                label="Item is packed?"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.isOwned}
                                        name="isOwned"
                                        inputProps={{ 'aria-label': 'isOwned' }}
                                        onChange={this.handleChangeOwn}

                                    />
                                }
                                label="Already Owned?"
                            />
                        </FormGroup>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                         </Button>
                        <Button onClick={this.newItemSubmit} color="primary">
                            Add to Packlist
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
export default NewItem;
import React, { Component } from "react";
import APIURL from "../../../helpers/environment";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Switch, FormGroup, FormControlLabel } from "@material-ui/core";

type NewItemProps = {
    plID: number,
    appState: { authenticated: boolean, token: string | null },
    refresh: (newState: boolean) => void,
    refreshState: boolean
}
type NewItemState = {
    itemsData: {
        itemName: string,
        qty: number,
        isOwned: boolean,
        isPacked: boolean,
    },
    open: boolean,
}

class NewItem extends Component<NewItemProps, NewItemState> {
    constructor(props: NewItemProps) {
        super(props)
        this.state = {
            itemsData: {
                itemName: '',
                qty: 0,
                isOwned: false,
                isPacked: false,
            },
            open: false,
        }
        console.log(props.plID);
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
                itemName: this.state.itemsData.itemName,
                isOwned: this.state.itemsData.isOwned,
                isPacked: this.state.itemsData.isPacked,
                qty: this.state.itemsData.qty,
            })
        })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                // window.location.reload()

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
    handleChange = (e: any) => {
        this.setState({
            itemsData: {
                itemName: e.target.value,
                qty: e.target.value,
                isOwned: e.target.checked,
                isPacked: e.target.checked
            }
        })
    }

    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Add an Item
                </Button>
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
                                onChange={this.handleChange}

                            />
                            <TextField
                                name="qty"
                                id="qty"
                                label="Quantity"
                                type="number"
                                fullWidth
                                onChange={this.handleChange}

                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.itemsData.isPacked}
                                        onChange={this.handleChange}
                                        name="isPacked"
                                        inputProps={{ 'aria-label': 'isPacked' }}
                                    />
                                }
                                label="Item is packed?"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.itemsData.isOwned}
                                        onChange={this.handleChange}
                                        name="isOwned"
                                        inputProps={{ 'aria-label': 'isOwned' }}
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
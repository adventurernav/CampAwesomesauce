import { TableContainer, TableRow, Table, TableHead, TableCell, TableBody, Button, Switch } from "@material-ui/core";
import React, { Component } from "react";
import DeleteItem from "./DeleteItem";
import UpdateItem from "./UpdateItem";
import Slider from './Slider'

type PLitemProps = {
    plID: number,
    appState: { authenticated: boolean, token: string | null },
    items: itemObject[]
}
type itemObject = {
    id: number,
    itemName: string,
    isOwned: boolean,
    isPacked: boolean,
    qty: number
}

class ItemTable extends Component<PLitemProps> {


    requestHeaders: any = { 'Content-Type': 'application/json', 'Authorization': this.props.appState.token };
    componentDidMount() {
    }
    componentDidUpdate() {
    }
    updateItemDetail() {

    }
    render() {

        return (
            <div>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Item</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Owned?</TableCell>
                                <TableCell> Packed?</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.items.map((thisItem, i) => (
                                <TableRow key={thisItem.id}>
                                    <TableCell><UpdateItem itemID={thisItem.id} appState={this.props.appState} /></TableCell>

                                    <TableCell>{thisItem.itemName}</TableCell>

                                    <TableCell>{thisItem.qty}</TableCell>

                                    <TableCell>
                                        <Slider itemID={thisItem.id} checked={thisItem.isOwned} sliderKey={'isOwned'} appState={this.props.appState}/>
                                    </TableCell>
                                    <TableCell>
                                    <Slider itemID={thisItem.id} checked={thisItem.isOwned} sliderKey={'isPacked'} appState={this.props.appState}/>
                                    </TableCell>
                                    <TableCell><DeleteItem itemID={thisItem.id} appState={this.props.appState} /></TableCell>
                                </TableRow>

                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}
export default ItemTable;
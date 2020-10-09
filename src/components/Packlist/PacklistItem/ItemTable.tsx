import { TableContainer, TableRow, Table, TableHead, TableCell, TableBody, Button } from "@material-ui/core";
import React, { Component } from "react";
import DeleteItem from "./DeleteItem";

type PLitemProps = {
    plID: number,
    appState: { authenticated: boolean, token: string | null },
    refresh: (newState: boolean) => void,
    refreshState: boolean,
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

    render() {

        return (
            <div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Item
                                </TableCell>
                                <TableCell>
                                    Quantity
                                </TableCell>
                                <TableCell>
                                    Owned?
                                </TableCell>
                                <TableCell>
                                    Packed?
                                </TableCell>
                                <TableCell>
                                    Edit
                                </TableCell>
                                <TableCell>
                                    Delete
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.items.map((thisItem, i) => (
                                <TableRow>
                                    <TableCell>{thisItem.itemName}</TableCell>
                                    <TableCell>{thisItem.qty}</TableCell>
                                    <TableCell>{thisItem.isOwned}</TableCell>
                                    <TableCell>{thisItem.isPacked}</TableCell>
                                    <TableCell><Button>Edit</Button></TableCell>
                                    <TableCell><DeleteItem itemID={thisItem.id} appState={this.props.appState} refresh={this.props.refresh} refreshState={this.props.refreshState}/></TableCell>
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
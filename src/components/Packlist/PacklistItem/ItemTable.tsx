import { TableContainer, TableRow, Table, TableHead, TableCell, TableBody } from "@material-ui/core";
import React, { Component } from "react";
import DeleteItem from "./DeleteItem";
import UpdateItem from "./UpdateItem";
import NewItem from './NewItem'
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
                                <TableCell>
                                    <NewItem appState={this.props.appState} plID={this.props.plID} />
                                </TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell>Item</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Owned?</TableCell>
                                <TableCell>Packed?</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {this.props.items.map((thisItem) => (
                                <TableRow key={thisItem.id}>
                                    <TableCell><UpdateItem textKey={'itemName'} itemID={thisItem.id} currentValue={thisItem.itemName} appState={this.props.appState} /></TableCell>

                                    <TableCell><UpdateItem textKey={'qty'} itemID={thisItem.id} currentValue={thisItem.qty} appState={this.props.appState} /></TableCell>

                                    <TableCell>
                                        <Slider itemID={thisItem.id} checked={thisItem.isOwned} sliderKey={'isOwned'} appState={this.props.appState} />
                                    </TableCell>
                                    <TableCell>
                                        <Slider itemID={thisItem.id} checked={thisItem.isOwned} sliderKey={'isPacked'} appState={this.props.appState} />
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
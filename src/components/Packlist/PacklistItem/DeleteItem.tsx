import React, { Component } from "react";
import { Button } from '@material-ui/core'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import APIURL from "../../../helpers/environment";

type DelProps = {
    itemID: number,
    appState: { authenticated: boolean, token: string | null },
    
}
class DeleteItem extends Component<DelProps> {
   

    
    submitClick = () => {
        this.delPacklistFetch();
    }
    delPacklistFetch = (): void => {
        if(this.props.appState.token!==null){

        fetch(`${APIURL}/item/${this.props.itemID}`, {
            method: 'DELETE',
            headers: new Headers({'Content-Type': 'application/json' , Authorization: this.props.appState.token}),
        })
            .then(res => res.json())
            .then(response => {
                if (!response.error) {
                    window.location.reload()
                } else {
                    alert(`${response.error.errors[0].message}`)
                }
            })
            .catch(err => console.log(err))
    }}
    render() {
        return (
            <div>
                <Button color="secondary" onClick={this.submitClick}><DeleteOutlinedIcon/></Button>
            </div>
        )
    }
}
export default DeleteItem;
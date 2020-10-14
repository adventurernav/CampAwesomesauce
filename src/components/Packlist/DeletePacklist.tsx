import React, { Component } from "react";
import { Button } from '@material-ui/core'
import APIURL from "../../helpers/environment";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';


type DelProps = {
    plID: number,
    appState: { authenticated: boolean, token: string | null },
    
}
class DeletePacklist extends Component<DelProps> {
   

    
    submitClick = () => {
        this.delPacklistFetch();
    }
    delPacklistFetch = (): void => {
        if(this.props.appState.token!==null){

        fetch(`${APIURL}/packlist/${this.props.plID}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json' , 
                Authorization: this.props.appState.token
            })        })
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
export default DeletePacklist;
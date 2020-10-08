import React, { Component } from "react";
import APIURL from '../../../helpers/environment'

type PLitemProps = {
    plID: number,
    appState: { authenticated: boolean, token: string | null },
    refresh: (newState:boolean) => void,
    refreshState: boolean
}
class GetPacklist extends Component<PLitemProps> {

   
    requestHeaders: any = { 'Content-Type': 'application/json', 'Authorization': this.props.appState.token };
    componentDidMount() {
        this.itemsFetch()
        console.log(this.props.plID)
    }
    componentDidUpdate(){
    }
    itemsFetch = (): void => {
        fetch(`${APIURL}/item/${this.props.plID}`, {
            method: 'GET',
            headers: this.requestHeaders
        })
            .then(res => res.json())
            .then((results) => {
                console.log(results)

            })
            .catch(err => console.log(err))
    }
    render() {

        return (
            <div>
                <p>items</p>
            </div>
        )
    }
}
export default GetPacklist;
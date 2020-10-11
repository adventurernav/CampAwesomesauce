import { Button } from "@material-ui/core";
import React, { Component } from "react";
import APIURL from '../helpers/environment'

type DashboardProps = {
    appState: { authenticated: boolean, token: string | null }
}
export interface DashboardState {
    data: packlistObject[]
}

type packlistObject = {
    id: number,
    title: string
}
class Dashboard extends Component<DashboardProps> {
    state: DashboardState = {
        data: []
    }
    componentDidMount() {
        this.packlistFetch()
    }
    requestHeaders: any = { 'Content-Type': 'application/json', 'Authorization': this.props.appState.token };
    packlistFetch = (): void => {
        fetch(`${APIURL}/packlist/`, {
            method: 'GET',
            headers: this.requestHeaders
        })
            .then(res => res.json())
            .then((results) => {
                console.log(results)
                this.setState({
                    data: results
                })

            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                <div>
                <Button variant='outlined' href='/packlist' color='primary'>
                    <h3>My Packlists:</h3>
                    <ul>
                        {this.state.data.map((thisItem) => {
                            return (<li>{thisItem.title}</li>)
                        })}
                    </ul>
                    </Button>
                </div>
            </div>
        )
    }
}
export default Dashboard;
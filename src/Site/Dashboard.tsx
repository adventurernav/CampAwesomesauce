import { Button } from "@material-ui/core";
import React, { Component } from "react";
import APIURL from '../helpers/environment'
import { ProfileResults } from '../components/Profile/ProfileInterfaces'


type DashboardProps = {
    appState: { authenticated: boolean, token: string | null }
}
interface DashboardState {
    data: packlistObject[],
    users: {
        aboutMe: string,
        burnsAttended: number,
        favPrinciple: string,
        playaname: string,
        profilePic: string,
        status: string
    
}
}

type packlistObject = {
    id: number,
    title: string
}
class Dashboard extends Component<DashboardProps> {
    state: DashboardState = {
        data: [],
        users: {
            aboutMe: '',
            burnsAttended: 0,
            favPrinciple: '',
            playaname: '',
            profilePic: '',
            status: ''
        },
    }
    componentDidMount() {
        this.packlistFetch();
        this.profileFetch();
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
    profileFetch = (): any => {

        fetch(`${APIURL}/profile/`, {
            method: 'GET',
            headers: this.requestHeaders
        })
            .then(res => res.json())
            .then((data: ProfileResults) => {
                    this.setState({
                        users: {
                            aboutMe: data.users.aboutMe,
                            burnsAttended: data.users.burnsAttended,
                            favPrinciple: data.users.favPrinciple,
                            playaname: data.users.playaname,
                            profilePic: data.users.profilePic,
                            status: data.users.status
                        }
                    })
                
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                <h1>Hello, {this.state.users.playaname}</h1>
                <div>
                <Button variant='outlined' href='/packlist' color='primary'>
                    <h3>My Packlists:</h3>
                    <ul>
                        {this.state.data.length===0? <p>Click to start your first packlist!</p>:(this.state.data.map((thisItem) => {
                            return (<li>{thisItem.title}</li>)
                        }))}
                    </ul>
                    </Button>
                <Button variant='outlined' href='/profile' color='primary'>
                <h3>My Status:</h3>
                    <h5>{this.state.users.status}</h5>
                </Button>
                <Button variant='outlined' href='/account' color='primary'>My Account</Button>
                <Button variant='outlined' href='/resources' color='primary'>Resources</Button>
                </div>
            </div>
        )
    }
}
export default Dashboard;
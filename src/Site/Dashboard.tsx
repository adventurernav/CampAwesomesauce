import { Button, Grid } from "@material-ui/core";
import React, { Component } from "react";
import APIURL from '../helpers/environment'
import { ProfileResults } from '../components/Profile/ProfileInterfaces'


type DashboardProps = {
    appState: { authenticated: boolean, token: string | null }
}
interface DashboardState {
    packlist: packlistObject[],
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
        packlist: [],
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
    packlistFetch = (): void => {
        if(this.props.appState.token!==null){

        fetch(`${APIURL}/packlist/`, {
            method: 'GET',
            headers: new Headers({'Content-Type': 'application/json' , Authorization: this.props.appState.token}),        })
            .then(res => res.json())
            .then((results) => {
                this.setState({
                    packlist: results
                })

            })
            .catch(err => console.log(err))
    }}
    profileFetch = (): void => {
        if(this.props.appState.token!==null){

        fetch(`${APIURL}/profile/`, {
            method: 'GET',
            headers: new Headers({'Content-Type': 'application/json' , Authorization: this.props.appState.token}),        })
            .then(res => res.json())
            .then((profile: ProfileResults) => {
                    this.setState({
                        users: {
                            aboutMe: profile.users.aboutMe,
                            burnsAttended: profile.users.burnsAttended,
                            favPrinciple: profile.users.favPrinciple,
                            playaname: profile.users.playaname,
                            profilePic: profile.users.profilePic,
                            status: profile.users.status
                        }
                    })
                
            })
            .catch(err => console.log(err))
    }}
    render() {
        return (
            <Grid container direction='column'>
                <Grid item className='max-width'>
                {this.state.users.playaname? (<div>
                    <h1>Hello, {this.state.users.playaname}!</h1>
                    <img src={this.state.users.profilePic} alt='avatar' className='avatar' />
                </div>):null}
                <h3>Welcome back.</h3>
                </Grid>
                <Grid container direction='column' justify='space-between' className='max-width'>
                <Grid item className='max-width'>
                    <Button variant='outlined' href='/packlist' color='primary' className='max-width'>
                    <h3>My Packlists:</h3>
                    <ul>
                        {this.state.packlist.length>0? (this.state.packlist.map((thisItem) => {
                            return (<li>{thisItem.title}</li>)
                        }))
                        :<p>Click to start your first packlist!</p>
                    }
                    </ul>
                    </Button>
                    </Grid>
                    <Grid item className='max-width'>
                <Button variant='outlined' href='/profile' color='primary' className='max-width'>
                <h3>My Status: <br/>{this.state.users.status}</h3>
                </Button>
                </Grid>
                <Grid container justify='center'>

                <Grid item>
                <Button variant='outlined' href='/account' color='primary'>My Account</Button>
                </Grid>
                <Grid item>
                <Button variant='outlined' href='/resources' color='primary'>Resources</Button>
                </Grid>
                </Grid>
                </Grid>
            </Grid>
        )
    }
}
export default Dashboard;
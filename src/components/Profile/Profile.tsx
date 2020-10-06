import { Grid } from '@material-ui/core'
import React, { Component } from 'react'
import DeleteProfile from './DeleteProfile'
import GetProfile from './GetProfile'
import NewProfile from './NewProfile'

type ProfileProps = {
    appState: { authenticated: boolean, token: string | null }
}

class Profile extends Component<ProfileProps> {
    

    render() {
        return (
            <div>
                <h1>My Profile</h1>
                <Grid container direction="row" justify="space-around" alignItems="center" spacing={2}>
                    <Grid item>
                        <GetProfile appState={this.props.appState} />
                    </Grid>
                    <Grid container direction="row" justify="space-around" alignItems="center" spacing={2}>
                        <Grid item>
                            <NewProfile appState={this.props.appState} />
                        </Grid>
                        <Grid item>
                            <DeleteProfile appState={this.props.appState} />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
export default Profile
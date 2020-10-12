import { Grid } from '@material-ui/core'
import React, { Component } from 'react'
import Avatars from './Avatars'
import DeleteProfile from './DeleteProfile'
import GetProfile from './GetProfile'

type ProfileProps = {
    appState: { authenticated: boolean, token: string | null }
}

class Profile extends Component<ProfileProps> {


    render() {
        return (
            <div>
                <h1>My Profile</h1>
                <Grid container direction="column" justify="center" alignContent="center">
                    <Grid item>
                        <GetProfile appState={this.props.appState} />
                    </Grid>
                    <Grid item>
                        <DeleteProfile appState={this.props.appState} />
                    </Grid>
                    
                </Grid>
            </div>
        )
    }
}
export default Profile
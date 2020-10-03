import React, { Component } from 'react'
import DeleteProfile from './DeleteProfile'
import GetProfile from './GetProfile'
import NewProfile from './NewProfile'

type ProfileProps = {
    appState: {authenticated: boolean, token: string|null}
}

class Profile extends Component <ProfileProps> {
constructor(props: ProfileProps){
    super(props)
    console.log(props);
    
}

    render(){return(
        <div>
            <h1>Profile</h1>
            <NewProfile appState={this.props}/>
            <GetProfile appState={this.props} />
            <DeleteProfile appState={this.props} />
        </div>
    )}
}
export default Profile
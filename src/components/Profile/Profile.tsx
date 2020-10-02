import React, { Component } from 'react'
import GetProfile from './GetProfile'
import NewProfile from './NewProfile'

type ProfileProps = {
    appState: {authenticated: boolean, token: string}
}

class Profile extends Component <ProfileProps> {
constructor(props: ProfileProps){
    super(props)
    
}

    render(){return(
        <div>
            <h1>Profile</h1>
            <NewProfile appState={this.props}/>
            <GetProfile appState={this.props} />
        </div>
    )}
}
export default Profile
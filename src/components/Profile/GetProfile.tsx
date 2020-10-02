import React, { Component } from "react";
import APIURL from '../../helpers/environment'
import {ProfileResults} from './ProfileInterfaces'

type getProfileProps = {
    appState: { appState: { authenticated: boolean, token: string } }
}
class GetProfile extends Component<getProfileProps, ProfileResults> {
    constructor(props: getProfileProps) {
        super(props)
        this.state = {
            users: {
                aboutMe: '',
                burnsAttended: 0,
                favPrinciple: '',
                playaname: '',
                profilePic: '',
                status: ''
            }
        }
    }
    componentDidMount(){
        this.profileFetch()
    }
    profileFetch = (): any => {
        let id:number = 1; //this should be the user's ID
        let token:string = this.props.appState.appState.token
        fetch(`${APIURL}/profile/${id}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token
                // 'Authorization': window.localStorage.getItem('token')
            })
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
                return data
            })
            .then(()=>console.log(this.state))
            .catch(err => console.log(err))
    }


    render() {
        return (
            <div>
                <p>{`Playaname: ${this.state.users.playaname}`}</p>
                <img src={this.state.users.profilePic} alt="Profile Picture"/>
                <p>{`Status: ${this.state.users.status}`}</p>
                <p>{`Burns Attended: ${this.state.users.burnsAttended}`}</p>
                <p>{`Favorite Principle: ${this.state.users.favPrinciple}`}</p>
                <p>{`About Me: ${this.state.users.aboutMe}`}</p>
            </div>
        )
    }
}
export default GetProfile;
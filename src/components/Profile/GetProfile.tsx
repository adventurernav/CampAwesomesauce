import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import APIURL from '../../helpers/environment'
import { ProfileResults } from './ProfileInterfaces'
import UpdateProfile from "./UpdateProfile";

type getProfileProps = {
    appState: { authenticated: boolean, token: string | null }
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
            },
            newUser: false,
            upSubmitted: false
        }
    }
    requestHeaders: any = { 'Content-Type': 'application/json', 'Authorization': this.props.appState.token };

    componentDidMount() {
        this.profileFetch()
    }
    profileFetch = (): any => {

        fetch(`${APIURL}/profile/`, {
            method: 'GET',
            headers: this.requestHeaders
        })
            .then(res => res.json())
            .then((data: ProfileResults) => {
                if (data.users !== null) {
                    this.setState({
                        newUser: false,
                        users: {
                            aboutMe: data.users.aboutMe,
                            burnsAttended: data.users.burnsAttended,
                            favPrinciple: data.users.favPrinciple,
                            playaname: data.users.playaname,
                            profilePic: data.users.profilePic,
                            status: data.users.status
                        }
                    })
                } else {
                    this.setState({ newUser: true })
                }
            })
            .catch(err => console.log(err))
    }


    render() {
        return (
            <div>
                {(this.state.newUser === true) ? <Redirect to="/profile/new" /> : null}
                <Grid container direction="row" justify="space-between" alignContent="space-between" spacing={4}>

                    <Grid item>
                        <h1>Your Current Profile</h1>
                        <p className="getprofileP">{`Playaname: ${this.state.users.playaname}`}</p>
                        <p className="getprofileP">{`Burns Attended: ${this.state.users.burnsAttended}`}</p>
                        <p className="getprofileP">{`Favorite Principle: ${this.state.users.favPrinciple}`}</p>
                        <p className="getprofileP">{`Status: ${this.state.users.status}`}</p>
                        <p className="getprofileP">{`About Me: ${this.state.users.aboutMe}`}</p>
                        <img src={this.state.users.profilePic} alt="Avatar" style={{ height: '50px' }} />
                    </Grid>
                    <Grid item>
                        <UpdateProfile appState={this.props.appState} fetchResults={this.state} />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default GetProfile;
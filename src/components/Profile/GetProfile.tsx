import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import APIURL from '../../helpers/environment'
import { ProfileResults } from './ProfileInterfaces'
import UpdateProfile from "./UpdateProfile";
import DeleteModal from '../DeleteModal'
import UpdateAvatar from "./UpdateAvatar";

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
                status: '',
                userId: 0
            },
            newUser: false,
            upSubmitted: false
        }
    }

    componentDidMount() {
        this.profileFetch()
    }
    profileFetch = ():void => {
        if(this.props.appState.token!==null){

        fetch(`${APIURL}/profile/`, {
            method: 'GET',
            headers: new Headers({'Content-Type': 'application/json' , Authorization: this.props.appState.token}),        })
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
                            status: data.users.status,
                            userId: data.users.userId
                        }
                    })
                } else {
                    this.setState({ newUser: true })
                }
            })
            .catch(err => console.log(err))
    }}


    render() {
        return (
            <div>
                {(this.state.newUser === true) ? <Redirect to="/profile/new" /> : null}
                {this.state.users.playaname ?
                    <Grid container direction="row" justify="center" alignContent="space-between" spacing={3}>
                        <Grid container direction='column'>
                            <Grid item>
                                <h1>My Profile</h1>
                            </Grid>
                            <Grid item>
                                <UpdateAvatar currentValue={this.state.users.profilePic} appState={this.props.appState} />
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justify="center" alignContent="space-between" spacing={3}>
                            <Grid item>
                                <p className="getprofileP">Playaname:
                    <UpdateProfile currentValue={this.state.users.playaname} appState={this.props.appState} textKey={'playaname'} />
                                </p>
                            </Grid>
                            <Grid item>
                                <p className="getprofileP">Burns Attended:
                    <UpdateProfile currentValue={this.state.users.burnsAttended} appState={this.props.appState} textKey={'burnsAttended'} />
                                </p>
                            </Grid>
                            <Grid item>

                                <p className="getprofileP">Favorite Principle:
                    <UpdateProfile currentValue={this.state.users.favPrinciple} appState={this.props.appState} textKey={'favPrinciple'} />
                                </p>
                            </Grid>

                            <Grid item>

                                <p className="getprofileP">Status:
                    <UpdateProfile currentValue={this.state.users.status} appState={this.props.appState} textKey={'status'} />
                                </p>
                            </Grid>

                            <Grid item>

                                <p className="getprofileP">About Me:
                    <UpdateProfile currentValue={this.state.users.aboutMe} appState={this.props.appState} textKey={'aboutMe'} />
                                </p>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justify="center" alignContent="space-between" spacing={3}>
                            <Grid item>
                                <DeleteModal appState={this.props.appState} path={`profile/${this.state.users.userId}`} buttonLabel={'Delete My Profile'} confirmLabel={'Yes, Delete my Profile'} title={'Are you sure you want to delete your profile? This CANNOT be undone. '} />
                            </Grid>
                        </Grid>
                    </Grid>


                    : null}
            </div>
        )
    }
}

export default GetProfile;
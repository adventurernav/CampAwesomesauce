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
                console.log(data)
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
                {this.state.users.playaname? 
                <Grid container direction="row" justify="space-between" alignContent="space-between" spacing={4}>

                <Grid item>
                    <p className="getprofileP">Playaname:
                    <UpdateProfile currentValue={this.state.users.playaname} appState={this.props.appState} fetchResults={this.state} textKey={'playaname'} />
                    </p>
                    <p className="getprofileP">Burns Attended:
                    <UpdateProfile currentValue={this.state.users.burnsAttended}appState={this.props.appState} fetchResults={this.state} textKey={'burnsAttended'} />
                    </p>
                    <p className="getprofileP">Favorite Principle: 
                    <UpdateProfile currentValue={this.state.users.favPrinciple} appState={this.props.appState} fetchResults={this.state} textKey={'favPrinciple'} />
                    </p>
                    <p className="getprofileP">Status:
                    <UpdateProfile currentValue={this.state.users.status}appState={this.props.appState} fetchResults={this.state} textKey={'status'} />
                    </p>
                    <p className="getprofileP">About Me:
                    <UpdateProfile currentValue={this.state.users.aboutMe}appState={this.props.appState} fetchResults={this.state} textKey={'aboutMe'} />
                    </p>
                    <img src={this.state.users.profilePic} alt="Avatar" style={{ height: '50px' }} />
                </Grid>
            </Grid>
                :null}
            </div>
        )
    }
}

export default GetProfile;
import React, { Component } from 'react'
import APIURL from '../../helpers/environment'

import UpdateUser from './UpdateUser'
import { Container, Grid } from '@material-ui/core'
import DeleteUser from './DeleteUser'

type UserProps = {
    appState: {
        authenticated: boolean,
        token: string | null
    }
}
type UserState = {
    user: {
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        createdAt: string,
        id: number
    },
}
type UserResults = {
    id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    createdAt: string,

}
class User extends Component<UserProps, UserState>{
    constructor(props: UserProps) {
        super(props)
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                createdAt: '',
                id: 0
            },
        }
    }
    requestHeaders: any = { 'Content-Type': 'application/json', 'Authorization': this.props.appState.token };
    componentDidMount() {
            this.getUser()
       
    }
    componentDidUpdate() {
        console.log(this.state.user.id)
    }

    getUser() {
        fetch(`${APIURL}/user/`, {
            method: 'GET',
            headers: this.requestHeaders
        })
            .then(res => res.json())
            .then((data: UserResults) => {
                console.log(data)
                this.setState({
                    user: {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        password: data.password,
                        createdAt: data.createdAt,
                        id: data.id
                    }
                })

            })
            .catch(err => console.log(err))
    }
    render() {
        const memberSince = this.state.user.createdAt.slice(0, 4)
        return (
            <Container>
                    <Grid container direction="column" justify="center">
                    <Grid item>
                    <h1>My Account</h1>
                            </Grid>
                        <Grid item>
                                <h3>Member Since: {memberSince}</h3>
                            </Grid>
                    </Grid>
                    {this.state.user.id ?
                        <Grid container justify="space-around" alignItems="center">
                            
                            <Grid item>
                                <p>First Name: <UpdateUser appState={this.props.appState} textKey={'firstName'} currentValue={this.state.user.firstName} /></p>
                            </Grid>
                            <Grid item>
                                <p>Last Name: <UpdateUser appState={this.props.appState} textKey={'lastName'} currentValue={this.state.user.lastName} /></p>
                            </Grid>
                            <Grid item>
                                <p>E-mail: <UpdateUser appState={this.props.appState} textKey={'email'} currentValue={this.state.user.email} /></p>
                            </Grid>
                            <Grid item>
                                <p>Password: <UpdateUser appState={this.props.appState} textKey={'password'} currentValue='Update Password' /></p>
                            </Grid>
                        <Grid container direction="row" justify="center">
                            <DeleteUser appState={this.props.appState} />
                        </Grid>

                        </Grid>
                        : null}
                </Container>
        )
    }
}
export default User;
import React, { Component } from 'react'
import APIURL from '../../helpers/environment'

import UpdateUser from './UpdateUser'
import DeleteUser from './DeleteUser'
import { Container, Grid } from '@material-ui/core'

type UserProps = {
    appState: { authenticated: boolean, token: string | null }
}
type UserState = {
    user: {
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        createdAt: string
    }
}
type UserResults = {
    id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    createdAt: string

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
                createdAt: ''
            }
        }
    }
    requestHeaders: any = { 'Content-Type': 'application/json', 'Authorization': this.props.appState.token };
    componentDidMount() {
        this.getUser()
    }
    getUser() {
        fetch(`${APIURL}/user/`, {
            method: 'GET',
            headers: this.requestHeaders
        })
            .then(res => res.json())
            .then((data: UserResults) => {
                this.setState({
                    user: {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        password: data.password,
                        createdAt: data.createdAt
                    }
                })
            })
    }
    render() {
        const memberSince = this.state.user.createdAt
        return (
            <Container>
                <Grid container direction="row" justify="center">
                        <h1>My Account</h1>
                </Grid>
                <Grid container justify="space-around" alignItems="center">
                    <Grid item>
                        <h3>Member Since: {memberSince}</h3>
                        <p>First Name: {this.state.user.firstName}</p>
                        <p>Last Name: {this.state.user.lastName}</p>
                        <p>E-mail: {this.state.user.email}</p>
                    </Grid>
                    <Grid item>
                        <UpdateUser appState={this.props.appState} />
                    </Grid>
                    <Grid container direction="row" justify="center">
                        <DeleteUser appState={this.props.appState} />
                </Grid>
                    
                </Grid>
            </Container>
        )
    }
}
export default User;
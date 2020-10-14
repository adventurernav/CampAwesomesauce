import { Grid, Button, Table, TableHead, TableCell, TableBody, TableRow, Card, CardContent } from "@material-ui/core";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import React, { Component } from "react";
import {Redirect} from 'react-router-dom'
import APIURL from '../../helpers/environment'
import requestHeaders from "../RequestHeaders";
import AdminUpdate from './AdminUpdate'


type AdminProps = {
    appState: {
        authenticated: boolean,
        token: string | null,
        admin: boolean
    }
}
type AdminState = {
    users: usersObject[]
}
type usersObject = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    createdAt: string,
    id: number
}
class Admin extends Component<AdminProps, AdminState> {
    constructor(props: AdminProps) {
        super(props)
        this.state = {
            users: []
                }
    }
    componentDidMount() {
        this.getUsers()
    }
    requestHeaders: any = { 'Content-Type': 'application/json', 'Authorization': this.props.appState.token };
    getUsers() {
        if(this.props.appState.token!==null){
            fetch(`${APIURL}/admin/users`, {
            method: 'GET',
            headers: this.requestHeaders
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    users: data
                })
            })
        }
    }
    deleteUser (thisUser:usersObject) {
        fetch(`${APIURL}/admin/users/${thisUser.id}`, {
            method: 'DELETE',
            headers: this.requestHeaders
        })
            .then(res => res.json())
            .then(response => {
                if (!response.error) {
                    this.setState({users:response.user})
                } else {
                    alert(`${response.error.errors[0].message}`)
                }
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                {this.props.appState.admin===false? <Redirect to='/' /> : null}
                <h1>Admin Portal</h1>
                <Grid container justify='center'>
                    <Card id='number-of-users'>
                        <CardContent>

                            <h1>Number of users:</h1>
                            <h1>
                                {this.state.users.length}
                            </h1>
                        </CardContent>
                    </Card>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>User</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.users.map((thisUser) => {
                                return (
                                    <TableRow key={thisUser.id}>
                                        <TableCell><AdminUpdate path={'users'} textKey={'email'} userID={thisUser.id} currentValue={thisUser.email} appState={this.props.appState} /></TableCell>
                                        <TableCell><AdminUpdate path={'users/password'} textKey={'password'} userID={thisUser.id} currentValue={'Update Password'} appState={this.props.appState} /></TableCell>
                                        <TableCell><AdminUpdate path={'users'} textKey={'firstName'} userID={thisUser.id} currentValue={thisUser.firstName} appState={this.props.appState} /></TableCell>
                                        <TableCell><AdminUpdate path={'users'} textKey={'lastName'} userID={thisUser.id} currentValue={thisUser.lastName} appState={this.props.appState} /></TableCell>
                                        <TableCell><Button color="secondary" onClick={(e)=>{e.preventDefault();this.deleteUser(thisUser)}}><DeleteOutlinedIcon/></Button></TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    <ol>

                    </ol>
                </Grid>

            </div>
        )
    }
}
export default Admin;
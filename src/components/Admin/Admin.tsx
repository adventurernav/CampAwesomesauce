import { Grid, Button, Table, TableHead, TableCell,TableBody, TableRow, Paper, Card, CardContent } from "@material-ui/core";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import APIURL from '../../helpers/environment'
import AdminUpdate from './AdminUpdate'

type AdminProps = {
    appState: {
        authenticated: boolean,
        token: string | null,
        admin: boolean | null
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
componentDidMount(){
    this.getUsers()
}
    requestHeaders: any = { 'Content-Type': 'application/json', 'Authorization': this.props.appState.token };
    getUsers() {
        fetch(`${APIURL}/admin/users`, {
            method: 'GET',
            headers: this.requestHeaders
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                this.setState({
                    users: data
                })
            })
    }
    render() {
        return (
            <div>
                {/* {this.props.appState.admin===false? <Redirect to='/' /> : null} */}
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
                        {this.state.users.map((thisUser)=>{
                            return(
                            <TableRow key={thisUser.id}>
                                <TableCell><Button>{thisUser.email}</Button></TableCell>
                                <TableCell><AdminUpdate path={'users'} textKey={'firstName'} userID={thisUser.id} currentValue={thisUser.firstName} appState={this.props.appState} /></TableCell>
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
import { Grid, Button, Table } from "@material-ui/core";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import APIURL from '../../helpers/environment'

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
                {this.props.appState.admin===false? <Redirect to='/' /> : null}
                <h1>Admin Portal</h1>
                <Grid container>
                    <p>users/profiles edit/delete</p>
                    <p>Number of users:</p>
                    {this.state.users.length}
                    <Table></Table>
                    <ol>
                        {this.state.users.map((thisUser)=>{
                            return(
                            <li key={thisUser.id}><Button>{thisUser.email}</Button></li>
                            )
                        })}
                    </ol>
                </Grid>
                
            </div>
        )
    }
}
export default Admin;
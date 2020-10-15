import { Button, Grid } from "@material-ui/core";
import React, { Component } from "react";
import APIURL from '../../helpers/environment'
import { Profiles } from './ProfileInterfaces'
import CampmatesDisplay from './CampmatesDisplay'


type getProfileProps = {
    appState: { authenticated: boolean, token: string | null }
}

type CampmatesState={
data: profile[]
}
export interface profile {
    
    playaname: string,
    profilePic: string,
    status: string,
    

}

class Campmates extends Component<getProfileProps, CampmatesState> {
    constructor(props: getProfileProps) {
        super(props)
        this.state = {
            data: []
            }
        }
    
    componentDidMount() {
        this.profileFetch()
    }
    componentDidUpdate(){
        console.log(this.state.data)
    }
    profileFetch = ():void => {
        if(this.props.appState.token!==null){

        fetch(`${APIURL}/profile/all`, {
            method: 'GET',
            headers: new Headers({'Content-Type': 'application/json' , Authorization: this.props.appState.token}),        })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                if (data !== null) {
                    this.setState({data:data.profile})
                }
            })
            .catch(err => console.log(err))
    }}


    render() {
        return (
            <div>
                
                    <Grid container direction="row" justify="center" alignContent="space-between" spacing={3}>
                        <Grid container direction='column'>
                            <Grid item>
                    <h1>Campmates</h1>
                            </Grid>
                            <Grid item>
                                <CampmatesDisplay profile={this.state.data}/>
                            </Grid>
                            
                        </Grid>
                        
                    </Grid>


            </div>
        )
    }
}

export default Campmates;
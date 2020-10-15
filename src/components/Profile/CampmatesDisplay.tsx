import { Grid } from '@material-ui/core'
import React from 'react'

type displayProps = {
    profile:profile[]
}

export interface profile {
    playaname: string,
    profilePic: string,
    status: string,
}
function CampmatesDisplay(props: displayProps) {
    console.log(props.profile)
    return (
        <Grid container direction='row' justify='center'>
            {props.profile?
            (props.profile.map((pro)=>{
                return(
                    <div className='avatar-radios-div div-padding'>
                        <h1>{pro.playaname}</h1>
                        <img src={pro.profilePic} alt='avatar' className='avatar' />
                        <h4>Status:{pro.status}</h4>
                    </div>
                )
            }))
            :null
        }
        </Grid>
    )
}
export default CampmatesDisplay;
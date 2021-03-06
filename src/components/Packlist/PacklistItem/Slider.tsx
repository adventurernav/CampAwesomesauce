import React, { Component } from 'react'
import { Switch } from '@material-ui/core'
import APIURL from '../../../helpers/environment'

type SliderProps = {
    itemID: number,
    checked: boolean,
    sliderKey: string,
    appState: { authenticated: boolean, token: string | null },

}
type SliderState ={
    checked: boolean
}
export default class Slider extends Component <SliderProps, SliderState> {
constructor(props:SliderProps){
    super(props)
    this.state={
        checked: this.props.checked
    }
    this.handleChange = this.handleChange.bind(this)
}

handleChange(e: React.ChangeEvent<HTMLInputElement>):void{
    if(this.props.appState.token!==null){

    fetch(`${APIURL}/item/${this.props.itemID}`,{
        method: 'PUT',
        headers: new Headers({'Content-Type': 'application/json' , Authorization: this.props.appState.token}),
        body: JSON.stringify({
            [this.props.sliderKey]: e.target.checked
        })
    })
    .then((res)=>res.json())
    .then((data)=>{
        if (data.NumberOfItemsUpdated[0]===1){
            this.setState({checked:!this.state.checked})
        } else {throw new Error('Item not updated')}
        
    })
    .catch((err)=>console.log(err))

}}
    render() {
        return (
            <div>
                <Switch
                    checked={this.state.checked}
                    color="primary"
                    name={this.props.sliderKey}
                    onChange={(e) => {
                        this.handleChange(e);
                    }}
                />
            </div>
        )
    }
}
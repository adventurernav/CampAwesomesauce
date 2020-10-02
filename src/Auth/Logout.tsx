import React, {Component} from "react";
import { Button } from "@material-ui/core";

type LogoutProps = {
    updateToken: (token:string, authenticated:boolean)=>void
}
class Logout extends Component <LogoutProps> {

    removeToken = ():void => {
        window.localStorage.removeItem('token');
        this.props.updateToken('', false)
    }

    render(){
        return(
            <div>
                <Button onClick={this.removeToken}>Logout</Button>
            </div>
        )
    }
}
export default Logout;
import React, {Component} from "react";
import { Button } from "@material-ui/core";

type LogoutProps = {
    updateToken: (token:string, authenticated:boolean)=>void,
}

class Logout extends Component <LogoutProps> {

    removeToken = ():void => {
        window.localStorage.removeItem('token');
        this.props.updateToken('', false)
    }

    componentDidMount(){
        this.removeToken();
    }

    render(){
        return(
            <div>
                <h3>You have been logged out. </h3>
                <Button href="/auth">Login again</Button>
            </div>
        )
    }
}
export default Logout;
import { Link } from "@material-ui/core";
import React, {Component} from "react";

class Donate extends Component {

    render(){
        return(
            <div>
                <h1>Donate to our cause or pay your annual camp dues:</h1>
                <Link href='https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=contributions%40campawesomesauce.org&item_name=Donations+and+Dues&currency_code=USD' target='_blank'><img src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"/></Link>
            </div>
        )
    }
}
export default Donate;
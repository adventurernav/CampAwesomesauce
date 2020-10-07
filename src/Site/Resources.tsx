import { Link } from "@material-ui/core";
import React, {Component} from "react";

class Resources extends Component {

    render(){
        return(
            <div>
                <h1>Resources</h1>
                <Link href='https://burningman.org/'>The Official Burning Man Website</Link>
                <Link href='https://burningman.org/culture/philosophical-center/10-principles/'>The 10 Principles of Burning Man</Link>
                <Link href='https://burningman.org/event/preparation/first-timers-guide/'>First Timer's Guide</Link>

            </div>
        )
    }
}
export default Resources;
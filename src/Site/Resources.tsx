import { Link, List, ListItem } from "@material-ui/core";
import React, { Component } from "react";
import FacebookIcon from '@material-ui/icons/Facebook';

class Resources extends Component {

    render() {
        return (
            <div>
                <h1>Resources</h1>
                <List>
                    <ListItem>
                        <Link href='https://www.facebook.com/groups/1467255686848807'><FacebookIcon />  Camp Awesomesauce Group</Link>
                    </ListItem>
                    <ListItem>
                        <Link href='https://burningman.org/'>The Official Burning Man Website</Link>
                    </ListItem>
                    <ListItem>
                        <Link href='https://burningman.org/culture/philosophical-center/10-principles/'>The 10 Principles of Burning Man</Link>
                    </ListItem>
                    <ListItem>
                        <Link href='https://burningman.org/event/preparation/first-timers-guide/'>First Timer's Guide</Link>
                    </ListItem>
                    <ListItem>
                        <Link href='https://regionals.burningman.org/'>Find a Regional Burn</Link>
                    </ListItem>
                    <ListItem>
                        <Link href='https://burningman.org/culture/history/brc-history/event-archives/2019-event-archive/'>See what happened in 2019</Link>
                    </ListItem>

                </List>
            </div>
        )
    }
}
export default Resources;
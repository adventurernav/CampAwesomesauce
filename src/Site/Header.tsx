import React, { Component } from "react";
import { Link } from 'react-router-dom'

class Header extends Component {

    render() {
        return (
            <div id="nav-container">
                <nav >
                    <div >
                        <Link to="/" >Home</Link>
                        <div >
                            <ul >
                                <li >
                                    <Link to="/auth">Auth</Link>
                                </li>
                                <li >
                                    <Link to="/packlist">Packlist</Link>
                                </li>
                                <li >
                                    <Link to="/profile">Profile</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <p>BRC Weather</p>
            </div>
        )
    }
}
export default Header;
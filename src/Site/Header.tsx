import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { AppBar, IconButton, Toolbar, List, ListItem, Drawer, CssBaseline, Typography, Divider } from "@material-ui/core";
import { Menu, ChevronLeft } from '@material-ui/icons'
import { Theme } from '@material-ui/core/styles'
import uniIcon from '../assets/whiteuni.png'
const drawerWidth = 240;

const styles = (theme: Theme) =>
    ({
        root: {
            display: 'flex',
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),

        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }
    })
type headerState = {
    classes: any,
    open: boolean
}
class Header extends Component<{}, headerState> {
    constructor() {
        super({})
        this.state = {
            classes: styles,
            open: false
        }
    }
    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.state
        return (
            <div className={classes.root} id="nav-container">
                <CssBaseline />
                <AppBar
                    position="static"

                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                        >
                            <Menu />
                        </IconButton>
                        <img style={{height: '10vh'}}src={uniIcon} alt="Why isnt this img working?!?" />
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={this.state.open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeft />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem button>
                            <Link to="/" >Home</Link>
                        </ListItem>
                        <ListItem button>
                            <Link to="/auth">Auth</Link>
                        </ListItem>
                        <ListItem button>
                            <Link to="/packlist">Packlist</Link>
                        </ListItem>
                        <ListItem button>
                            <Link to="/profile">Profile</Link>
                        </ListItem>
                    </List>
                </Drawer>

            </div>
        )
    }
}
export default Header;

{/*  */ }
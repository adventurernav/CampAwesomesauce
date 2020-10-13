import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { AppBar, IconButton, Toolbar, List, ListItem, Drawer, CssBaseline, Divider } from "@material-ui/core";
import { Menu, ChevronLeft } from '@material-ui/icons'
import { Theme } from '@material-ui/core/styles'
import uniIcon from '../assets/whiteuni.png'
import clsx from 'clsx';
const authRoute =[['/auth', 'Register or Login']]
const mainRoutes = [
    ['/', 'Home'],
    ['/resources', 'Resources'],
    ['/about', 'About'],
    ['/donate', 'Donate'],
    ['/contact', 'Contact']
]
const authdRoutes = [
    ['/dashboard', 'Dashboard'],
    ['/packlist', 'Packlist'],
    ['/profile', 'Profile'],
    ['/account', 'Account'],
    ['/logout', 'Logout'],
]
const adminRoutes = [
    ['/admin', 'Admin'],

]

const drawerWidth = 100;

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
type HeaderProps = {
    appState: { authenticated: boolean, token: string | null, admin: boolean}

}
type headerState = {
    classes: any,
    open: boolean
}
class Header extends Component<HeaderProps, headerState> {
    constructor(props: HeaderProps) {
        super(props)
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
    viewController = () => {
        const { classes } = this.state
        let allRoutes = mainRoutes.map((thisPath) => {
            return (<ListItem button className={classes.link}>
                <Link  className={classes.link} onClick={this.handleDrawerClose} to={thisPath[0]} >{thisPath[1]}</Link>
            </ListItem>)
        })
        if (this.props.appState.authenticated) {
            allRoutes = allRoutes.concat(authdRoutes.map((thisPath) => {
                return (<ListItem button>
                    <Link   className={classes.link} onClick={this.handleDrawerClose} to={thisPath[0]} >{thisPath[1]}</Link>
                </ListItem>)
            }))
        } else {
            allRoutes = allRoutes.concat(authRoute.map((thisPath) => {
                return (<ListItem button>
                    <Link  className={classes.link} onClick={this.handleDrawerClose} to={thisPath[0]} >{thisPath[1]}</Link>
                </ListItem>)
            }))}

        if (this.props.appState.admin) {
            allRoutes = allRoutes.concat(adminRoutes.map((thisPath) => {
                return (<ListItem button>
                    <Link  className={classes.link} onClick={this.handleDrawerClose} to={thisPath[0]} >{thisPath[1]}</Link>
                </ListItem>)
            }))
        }
        return allRoutes;
    }
    render() {

        const { classes } = this.state
        console.log(classes)
        return (
            <div className={classes.root} id="nav-container">
                <CssBaseline />
                <AppBar
                    position="static"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                    })}

                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, this.state.open && classes.hide)}
                        >
                            <Menu />
                        </IconButton>
                        <img style={{ height: '10vh' }} src={uniIcon} alt="Camp Awesomesauce" />
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant='temporary'
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
                        {this.viewController()}
                    </List>
                </Drawer>

            </div>
        )
    }
}
export default Header;

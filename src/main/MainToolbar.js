import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import classNames from 'classnames';
import {Avatar, Button, Icon, IconButton, ListItemIcon, ListItemText, Popover, MenuItem, Typography, Hidden} from '@material-ui/core';
import {connect} from 'react-redux';
import * as quickPanelActions from 'main/quickPanel/store/actions';
import {FuseShortcuts, FuseAnimate} from '@fuse';
import {Link} from 'react-router-dom';

const styles = theme => ({
    root     : {
        display   : 'flex',
        alignItems: 'center',
        width     : '100%'
    },
    seperator: {
        width          : 1,
        height         : 64,
        backgroundColor: theme.palette.divider
    }
});

class MainToolbar extends Component {

    

    state = {
        userMenu: null,
        refresh:false
    };

    userMenuClick = event => {
        this.setState({userMenu: event.currentTarget});
    };

    userMenuClose = () => {
        this.setState({userMenu: null});
    };

    render()
    {
        const {classes, auth, logout} = this.props;
        const {data} = auth;
        const {userMenu} = this.state;

        return (
            <div className={classNames(classes.root, "flex flex-row")}>

                <div className="flex flex-1 px-24">
                </div>

                <div className="flex">

                    {!auth.isLoading && data !== null?<FuseAnimate delay={300}>
                        <Button className="h-64" onClick={this.userMenuClick}>
                            <Avatar 
                                className=""
                                alt="user photo"
                                src={"assets/images/avatars/profile.jpg"} />

                            <div className="hidden md:flex flex-col ml-12 items-start">
                                <Typography component="span" className="normal-case font-600 flex">
                                    {data.user.firstname+" "+data.user.lastname}
                                </Typography>
                                <Typography className="text-11 capitalize" color="textSecondary">
                                    {data.user.role}
                                </Typography>
                            </div>

                            <Icon className="text-16 ml-12 hidden sm:flex" variant="action">keyboard_arrow_down</Icon>
                        </Button>                                               
                    </FuseAnimate>
                    : <Typography component="span" className="normal-case font-600 flex">Loading...</Typography>}
                    
                    <Popover
                        open={Boolean(userMenu)}
                        anchorEl={userMenu}
                        onClose={this.userMenuClose}
                        anchorOrigin={{
                            vertical  : 'bottom',
                            horizontal: 'center'
                        }}
                        transformOrigin={{
                            vertical  : 'top',
                            horizontal: 'center'
                        }}
                        classes={{
                            paper: "py-8"
                        }}
                    >
                        <React.Fragment>
                            <MenuItem component={Link} to="/logout">
                                <ListItemIcon>
                                    <Icon>lock</Icon>
                                </ListItemIcon>
                                <ListItemText className="pl-0" primary="Logout"/>
                            </MenuItem>
                        </React.Fragment>
                    </Popover>

                    <div className={classes.seperator}/>

                </div>
            </div>
        );
    }
}

function mapStateToProps({application})
{
    return {
        auth       : application.loginReducers.auth
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps)(MainToolbar));

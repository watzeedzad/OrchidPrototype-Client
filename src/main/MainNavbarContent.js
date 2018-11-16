import React from 'react';
import {withStyles, AppBar, Typography, Avatar, Hidden} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {FuseNavigation, FuseLayouts} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';

const styles = theme => ({
    root  : {
        '& .user': {
            '& .username, & .email': {
                transition: theme.transitions.create('opacity', {
                    duration: theme.transitions.duration.shortest,
                    easing  : theme.transitions.easing.easeInOut
                })
            }
        }
    },
    avatar: {
        width     : 144,
        height    : 144,
        position  : 'absolute',
        top       : 92,
        padding   : 8,
        background: theme.palette.background.default,
        boxSizing : 'content-box',
        left      : '50%',
        transform : 'translateX(-50%)',
        '& > img' : {
            borderRadius: '50%'
        }
    }
});


function MainNavbar({classes, navigation, layoutStyle, auth})
{
    function UserHeader()
    {
        return (
            <AppBar
                position="static"
                color="primary"
                elevation={0}
                className="user relative flex flex-col items-center justify-center pt-48 pb-96 mb-96 z-0"
            >
                {!auth.isLoading && auth.data != null ?
                <div>
                    <Typography className="username text-16 whitespace-no-wrap" color="inherit">{auth.data.farm.farmName}</Typography>
                    <Avatar
                        className={classNames(classes.avatar, "avatar")}
                        alt="farm photo"
                        src={"assets/images/farm/123456789.jpg"}
                    />
                </div>
                :<Typography className="username text-16 whitespace-no-wrap" color="inherit">Loading...</Typography>}
            </AppBar>
        );
    }

    const navigationLayout = FuseLayouts[layoutStyle].type;
    return (
        <div className={classes.root}>
            {navigationLayout === 'vertical' ? (
                <React.Fragment>
                    <UserHeader/>
                    <FuseNavigation navigation={navigation} layout={navigationLayout}/>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Hidden lgUp>
                        <UserHeader/>
                    </Hidden>
                    <FuseNavigation navigation={navigation} layout={navigationLayout}/>
                </React.Fragment>
            )}

        </div>
    );
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({}, dispatch);
}

function mapStateToProps({fuse, auth, application})
{
    return {
        navigation : fuse.navigation,
        layoutStyle: fuse.settings.current.layout.style,
        user       : auth.user,
        auth       : application.loginReducers.auth
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(MainNavbar)));

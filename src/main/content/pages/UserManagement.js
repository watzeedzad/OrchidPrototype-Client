import React from 'react'
import UserTab from '../components/UserManagement/UserTab'
import {FuseAnimate} from '@fuse';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'


const styles = theme => ({
    root: {
        width: '100%'
    },
});

function UserManagement (props) {   
    const { classes } = props;
        return (
            <div className={classes.root}>
                <UserTab />
            </div>
        )
    
}

export default  withStyles(styles, { withTheme: true })(UserManagement)
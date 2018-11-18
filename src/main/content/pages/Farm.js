import React from 'react'
import FarmTab from '../components/FarmManagement/FarmTab'
import {FuseAnimate} from '@fuse';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'


const styles = theme => ({
    root: {
        width: '100%'
    },
});

function FarmManagement (props) {   
    const { classes } = props;
        return (
            <div className={classes.root}>
                <FarmTab />
            </div>
        )
    
}

export default  withStyles(styles, { withTheme: true })(FarmManagement)
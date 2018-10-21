import React from 'react'
import GreenHouseTabs from '../components/ControllerManagement/GreenHouseTabs'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'


const styles = theme => ({
    root: {
        width: '100%'
    },
});
  

function ControllerManagement (props) {   
    const { classes } = props;
        return (
            <div className={classes.root}>
                <GreenHouseTabs />              
            </div>
        )
    
}

export default  withStyles(styles, { withTheme: true })(ControllerManagement)
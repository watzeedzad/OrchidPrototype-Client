import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import GreenHouseList from '../components/GreenHouse/GreenHouseList'

const styles = theme => ({
    root: {
        width: '100%'
    },
    layoutRoot: {}
});

function GreenHouse(props){    
    const { classes } = props;

        return (
            <GreenHouseList/>
        )
    
}

export default withStyles(styles, { withTheme: true })(GreenHouse)
import React from 'react'
import GrowthRateTab from '../components/Monitoring/GrowthRateTab'
import { withStyles } from '@material-ui/core/styles';
import {FuseAnimate,FusePageCarded} from '@fuse';
import {Icon, Typography} from '@material-ui/core';

const styles = theme => ({
    root: {
        width: '100%'
    },
    layoutRoot: {}
});

function Monitoring (props) {   
    const { classes } = props;

    return (
        <FusePageCarded
            classes={{
                root: classes.layoutRoot
            }}
            header={
                <div className="flex items-center">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Icon className="text-32 mr-12">show_chart</Icon>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <Typography variant="h6" >ติดตามการเจริญเติบโต</Typography>
                    </FuseAnimate>
                </div>
            }
            content={
                <FuseAnimate animation="transition.slideUpIn" delay={200}>
                    <div>
                        <GrowthRateTab />
                    </div>
                </FuseAnimate>
            }
        />
    )
    
}

export default  withStyles(styles, { withTheme: true })(Monitoring)
import React from 'react'
import LightIntensity from '../components/Light/LightIntensity';
import LightVolume from '../components/Light/LightVolume'
import { withStyles } from '@material-ui/core/styles';
import {FuseAnimate,FusePageCarded} from '@fuse';
import {Icon, Typography} from '@material-ui/core';

const styles = theme => ({
    root: {
        width: '100%'
    },
    layoutRoot: {}
});  

function LightControl (props) {   
    const { classes } = props;
        return (
            <FusePageCarded
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <div className="flex items-center">
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Icon className="text-32 mr-12">wb_sunny</Icon>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography variant="h6" >ควบคุมการให้แสง</Typography>
                        </FuseAnimate>
                    </div>
                }
                content={
                    <FuseAnimate animation="transition.slideUpIn" delay={200}>
                        <div>
                            <LightIntensity />
                            <LightVolume />
                        </div>
                    </FuseAnimate>
                }
            />
        )
    
}

export default  withStyles(styles, { withTheme: true })(LightControl)
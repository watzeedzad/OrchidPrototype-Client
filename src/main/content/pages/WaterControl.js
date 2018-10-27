import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import AutoWaterControl from '../components/WaterControl/AutoWaterControl';
import ManualWaterControl from '../components/WaterControl/ManualWaterControl';
import {FuseAnimate,FusePageCarded} from '@fuse';
import {Icon, Typography} from '@material-ui/core';

const styles = theme => ({
    root: {
        width: '100%'
    },
    layoutRoot: {}
});

function WaterControl(props){    
    const { classes } = props;

        return (
            <FusePageCarded
            classes={{
                root: classes.layoutRoot
            }}
            header={
                <div className="flex items-center">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Icon className="text-32 mr-12">waves</Icon>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <Typography variant="h6" >ตั้งค่าการให้น้ำ</Typography>
                    </FuseAnimate>
                </div>
            }
            content={
                <FuseAnimate animation="transition.slideUpIn" delay={200}>
                    <div>
                        <AutoWaterControl/><br/><hr/>
                        <ManualWaterControl/>
                    </div>
                </FuseAnimate>
            }
        />
        )
    
}

export default withStyles(styles, { withTheme: true })(WaterControl)
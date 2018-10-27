import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import AutoFertilizerControl from '../components/FertilizerControl/AutoFertilizerControl';
import ManualFertilizerControl from '../components/FertilizerControl/ManualFertilizerControl'
import {FuseAnimate,FusePageCarded} from '@fuse';
import {Icon, Typography} from '@material-ui/core';

const styles = theme => ({
    root: {
        width: '100%'
    },
    layoutRoot: {}
});

function FertilizerControl(props){
    const {classes} = props;

    return(
        <FusePageCarded
            classes={{
                root: classes.layoutRoot
            }}
            header={
                <div className="flex items-center">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Icon className="text-32 mr-12">local_florist</Icon>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <Typography variant="h6" >ตั้งค่าการให้ปุ๋ย</Typography>
                    </FuseAnimate>
                </div>
            }
            content={
                <FuseAnimate animation="transition.slideUpIn" delay={200}>
                    <div>
                        <AutoFertilizerControl/>
                        <ManualFertilizerControl/>
                    </div>
                </FuseAnimate>
            }
        />
    )
}

export default withStyles(styles,{withTheme:true})(FertilizerControl);


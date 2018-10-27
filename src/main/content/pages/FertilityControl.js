import React from 'react'
import Fertility from '../components/Fertility/Fertility'
import { withStyles } from '@material-ui/core/styles';
import {FuseAnimate,FusePageCarded} from '@fuse';
import {Icon, Typography} from '@material-ui/core';

const styles = theme => ({
    root: {
        width: '100%'
    },
    layoutRoot: {}
});
  

function FertilityControl (props) {   
    const { classes } = props;
        return (
            <FusePageCarded
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <div className="flex items-center">
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Icon className="text-32 mr-12">filter_vintage</Icon>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography variant="h6" >ปริมาณแร่ธาตุในเครื่องปลูก</Typography>
                        </FuseAnimate>
                    </div>
                }
                content={
                    <FuseAnimate animation="transition.slideUpIn" delay={200}>
                        <div>
                            <Fertility />
                        </div>
                    </FuseAnimate>
                }
            />
        )
    
}

export default  withStyles(styles, { withTheme: true })(FertilityControl)
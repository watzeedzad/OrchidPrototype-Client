import React from 'react'
import AutoFertilizerControl from '../components/FertilizerControl/AutoFertilizerControl';
import ManualFertilizerControl from '../components/FertilizerControl/ManualFertilizerControl'
import FertilizerHistory from '../components/FertilizerControl/FertilizerHistory'
import {FuseAnimate,FusePageCarded} from '@fuse';
import {Typography, SnackbarContent, withStyles, Icon} from '@material-ui/core';
import { connect } from 'react-redux'

const styles = theme => ({
    root: {
        width: '100%'
    },
    layoutRoot: {}
});

function FertilizerControl(props){
    const {classes,project} = props;
    const {data} = project

    if (project.isRejected) {
        return <SnackbarContent className="bg-red-light" message={"Error: "+project.data}/>
    }
    if (project.isLoading) {
        return <Typography variant="body1">Loading...</Typography>
    }
    if (data.errorMessage){
        return <SnackbarContent className="bg-red-light" message={data.errorMessage}/>
    }

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
                        <AutoFertilizerControl projectId={data.projectId}/>
                        <ManualFertilizerControl projectId={data.projectId}/>
                        <FertilizerHistory projectId={data.projectId}/>
                    </div>
                </FuseAnimate>
            }
        />
    )
}

function mapStateToProps({application}){
    return {
        project: application.projectReducers.project,
    }
}

export default withStyles(styles,{withTheme:true})(connect(mapStateToProps)(FertilizerControl));


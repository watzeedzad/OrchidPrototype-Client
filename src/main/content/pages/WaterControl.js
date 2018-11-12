import React, { Component } from 'react'
import AutoWaterControl from '../components/WaterControl/AutoWaterControl';
import ManualWaterControl from '../components/WaterControl/ManualWaterControl';
import WaterHistory from '../components/WaterControl/WaterHistory';
import {FuseAnimate,FusePageCarded} from '@fuse';
import {Typography, SnackbarContent, withStyles, Icon} from '@material-ui/core';
import { connect } from 'react-redux'

const styles = theme => ({
    root: {
        width: '100%'
    },
    layoutRoot: {}
});

function WaterControl(props){    
    const { classes,greenHouse } = props;
    const { data } = greenHouse

    if (greenHouse.isRejected) {
        return <SnackbarContent className="bg-red-light" message={"Error: "+greenHouse.data}/>
    }
    if (greenHouse.isLoading) {
        return <Typography variant="body1">Loading...</Typography>
    }
    if (data.errorMessage){
        return <SnackbarContent className="bg-red-light" message={data.errorMessage}/>
    }

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
                            <AutoWaterControl greenHouseId={data.greenHouseId}/>
                            <ManualWaterControl greenHouseId={data.greenHouseId}/>
                            <WaterHistory greenHouseId={data.greenHouseId}/>
                        </div>
                    </FuseAnimate>
                }
            />
        )
    
}

function mapStateToProps({application}) {
    return {
        greenHouse: application.greenHouseReducers.greenHouse,
    }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(WaterControl))
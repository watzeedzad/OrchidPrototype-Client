import React, { Component } from 'react';
import { connect } from 'react-redux'
import WateringTimeList from '../WaterControl/WateringTimeList'
import { getWateringTime } from 'store/actions/application/waterActions'
import {Typography, Grid, SnackbarContent} from '@material-ui/core';
import { setNavigation } from 'store/actions/fuse/navigation.actions'
import { greenHouseNavigation } from 'fuse-configs/fuseNavigationConfig';

class AutoWaterControl extends Component {
    
    state = {
        mss: '',
    }

    componentDidMount() {
        this.props.dispatch(setNavigation(greenHouseNavigation))
        //ดึงข้อมูลเวลาที่ตั้งไว้ทั้งหมดมาลง state
        if(!this.props.greenHouse.isLoading){
            this.props.dispatch(getWateringTime({ greenHouseId: this.props.greenHouse.data.greenHouseId }))
        }
    }

    render() {
        const { wateringTimeList, greenHouse } = this.props

        if (wateringTimeList.isRejected) {
            return <SnackbarContent className="bg-red-light" message={"Error: "+wateringTimeList.data}/>
        }
        if (wateringTimeList.isLoading || greenHouse.isLoading) {
            return <Typography variant="body1">Loading...</Typography>
        }
        if (wateringTimeList.data.errorMessage){
            return <SnackbarContent className="bg-red-light" message={wateringTimeList.data.errorMessage}/>
        }

        return (
            <Grid container spacing={24}>
                <Grid item xs={12} sm={12} md={12}>
                    <div className="pl-60 pt-40">
                        <Typography variant="headline">สั่งให้น้ำตามเวลา</Typography>
                    </div>
                    <WateringTimeList wateringTimeList={wateringTimeList}
                        greenHouseId={greenHouse.data.greenHouseId} 
                        onToggle={this.toggle} 
                        onDelete={this.delete} 
                        mss={this.state.mss}/>
                </Grid>
            </Grid>
        )   
    }

    toggle = () => {
        this.setState({
            mss: <SnackbarContent className="bg-green-light" message="บันทึกการตั้งค่าเวลาการให้น้ำสำเร็จ"/>
        })
        this.props.dispatch(getWateringTime({ greenHouseId: this.props.greenHouse.data.greenHouseId }))
    }

    delete = () => {
        this.setState({
            mss: <SnackbarContent className="bg-green-light" message="ทำการลบเวลาการให้น้ำสำเร็จ"/>
        })
        this.props.dispatch(getWateringTime({ greenHouseId: this.props.greenHouse.data.greenHouseId }))
    }

}

function mapStateToProps({application}) {
    return {
        wateringTimeList: application.waterReducers.wateringTimeList,
        greenHouse: application.greenHouseReducers.greenHouse,
    }
}

export default connect(mapStateToProps)(AutoWaterControl);
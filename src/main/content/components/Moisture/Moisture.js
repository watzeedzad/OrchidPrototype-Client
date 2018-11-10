import React, { Component } from 'react';
import { getMoisture,saveMoistureConfig } from '../../../../store/actions/application/planterActions'
import { connect } from 'react-redux'
import MoistureGauge from '../Moisture/MoistureGauge'
import SettingMoisture from '../Moisture/SettingMoisture'
import {Typography} from '@material-ui/core';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Grid from '@material-ui/core/Grid';
import { setNavigation } from 'store/actions/fuse/navigation.actions'
import { greenHouseNavigation } from 'fuse-configs/fuseNavigationConfig';

class Moisture extends Component {

    constructor() {
        super();
    
        this.state = {
            intervalId : null,
        };
    }

    componentDidMount() {
        this.props.dispatch(setNavigation(greenHouseNavigation))
        this.fetchData(0)
        var intervalId = setInterval( this.fetchData, 15000);
        this.setState({intervalId: intervalId});
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.moisture.data !== null && nextProps.moisture.data !== null){
            return this.props.moisture.data.currentSoilMoisture !== nextProps.moisture.data.currentSoilMoisture
        }else{
            return true
        }
    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    }
    
    fetchData = (count) => {
        if(!this.props.greenHouse.isLoading){
            this.props.dispatch(getMoisture({ greenHouseId: this.props.greenHouse.data.greenHouseId, count:count }))
        }
    }

    render() {
        const { moisture,greenHouse } = this.props
        const { data } = moisture

        if (moisture.isRejected) {
            return <SnackbarContent className="bg-red-light" message={"Error: "+moisture.data}/>
        }
        if (moisture.isLoading || greenHouse.isLoading) {
            return <Typography variant="body1">Loading...</Typography>
        }
        if (data.errorMessage){
            return <SnackbarContent className="bg-red-light" message={data.errorMessage}/>
        }
    
        return (
            <Grid container spacing={24}>
                <Grid item xs={12} sm={12} md={6}>
                    <MoistureGauge
                        minConfig={data.minConfigSoilMoisture}
                        maxConfig={data.maxConfigSoilMoisture}
                        currentValue={data.currentSoilMoisture}
                    />
                </Grid> 
                <Grid item xs={12} sm={12} md={6}>
                    <SettingMoisture
                        minConfig={data.minConfigSoilMoisture}
                        maxConfig={data.maxConfigSoilMoisture}
                        onSubmit={this.onSubmit}
                    />
                </Grid>
            </Grid>  
        )
    }

    onSubmit = (values) => {
        //เมื่อบันทึกข้อมูลเสร็จสังให้ไปยัง route /
        this.props.dispatch(saveMoistureConfig(values)).then(() => {
            this.fetchData(0)
        })
    }

}

function mapStateToProps({application}) {
    return {
        moisture: application.planterReducers.moisture,
        greenHouse: application.greenHouseReducers.greenHouse,
    }
}

export default connect(mapStateToProps)(Moisture)
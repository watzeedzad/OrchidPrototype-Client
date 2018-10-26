import React, { Component } from 'react';
import { getHumidity,saveHumidityConfig } from '../../../../store/actions/application/weatherActions'
import { connect } from 'react-redux'
import HumidityGauge from '../Humidity/HumidityGauge'
import SettingHumidity from '../Humidity/SettingHumidity'
import {Typography} from '@material-ui/core';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Grid from '@material-ui/core/Grid';

class Humidity extends Component {

    constructor() {
        super();
    
        this.state = {
            intervalId : null,
        };
    }

    componentDidMount() {
        this.fetchData(0)
        var intervalId = setInterval( this.fetchData, 15000);
        this.setState({intervalId: intervalId});
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.humidity.data !== null && nextProps.humidity.data !== null){
            return this.props.humidity.data.currentHumidity !== nextProps.humidity.data.currentHumidity
        }else{
            return true
        }

    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
     }
    
    fetchData = (count) => {
        this.props.dispatch(getHumidity({ greenHouseId: 789456123, count:count }))
    }

    render() {
        const { humidity } = this.props
        const { data } = humidity

        if (humidity.isRejected) {
            return <SnackbarContent className="bg-red-light" message={"Error: "+humidity.data}/>
        }
        if (humidity.isLoading) {
            return <Typography variant="body1">Loading...</Typography>
        }
        if (data.errorMessage){
            return <SnackbarContent className="bg-red-light" message={data.errorMessage}/>
        }
    
        return (
            <Grid container spacing={24}>
                <Grid item xs={12} sm={12} md={6}>
                    <HumidityGauge
                        minConfig={data.minConfigHumidity}
                        maxConfig={data.maxConfigHumidity}
                        currentValue={data.currentHumidity}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <SettingHumidity
                        minConfig={data.minConfigHumidity}
                        maxConfig={data.maxConfigHumidity}
                        onSubmit={this.onSubmit}
                    />
                </Grid>
            </Grid>    
        )
    }

    onSubmit = (values) => {
        //เมื่อบันทึกข้อมูลเสร็จสังให้ไปยัง route /
        this.props.dispatch(saveHumidityConfig(values)).then(() => {
            this.fetchData(0)
        })
    }
}

function mapStateToProps({application}) {
    return {
        humidity: application.weatherReducers.humidity,
    }
}

export default connect(mapStateToProps)(Humidity)
import React, { Component } from 'react';
import { getTemp,saveTempConfig } from '../../../../store/actions/application/weatherActions'
import { connect } from 'react-redux'
import TemperatureGauge from '../Temperature/TemperatureGauge'
import SettingTemperature from '../Temperature/SettingTemperature'
import {Typography} from '@material-ui/core';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Grid from '@material-ui/core/Grid';

class Temperature extends Component {

    constructor() {
        super();
    
        this.state = {
            intervalId : null,
        };
    }

    componentDidMount() {
        this.fetchData(0)
        var intervalId = setInterval( this.fetchData , 15000);
        this.setState({intervalId: intervalId});
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.temp.data !== null && nextProps.temp.data !== null){
            return this.props.temp.data.currentTemperature !== nextProps.temp.data.currentTemperature
        }else{
            return true
        }
    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    }
    
    fetchData = (count) => {
        this.props.dispatch(getTemp({ greenHouseId: 789456123 , count: count}))
    }

    render() {
        const { temp } = this.props
        const { data } = temp

        if (temp.isRejected) {
            return <SnackbarContent className="bg-red-light" message={"Error: "+temp.data}/>
        }
        if (temp.isLoading) {
            return <Typography variant="body1">Loading...</Typography>
        }
        if (data.errorMessage){
            return <SnackbarContent className="bg-red-light" message={data.errorMessage}/>
        }
    
        return (
             <Grid container spacing={24}>
                <Grid item xs={12} sm={12} md={6}>
                    <TemperatureGauge
                        minConfig={data.minConfigTemperature}
                        maxConfig={data.maxConfigTemperature}
                        currentValue={data.currentTemperature}
                    />    
                </Grid> 
                <Grid item xs={12} sm={12} md={6}>
                    <SettingTemperature
                        minConfig={data.minConfigTemperature}
                        maxConfig={data.maxConfigTemperature}
                        onSubmit={this.onSubmit}
                    />
                </Grid>
             </Grid>    
        )
    }

    onSubmit = (values) => {
        //เมื่อบันทึกข้อมูลเสร็จสังให้ไปยัง route /
        this.props.dispatch(saveTempConfig(values)).then(() => {
            this.fetchData(0)
        })
    }
}

function mapStateToProps({application}) {
    return {
        temp: application.weatherReducers.temp,
    }
}

export default connect(mapStateToProps)(Temperature)
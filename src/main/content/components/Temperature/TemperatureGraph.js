import React, { Component } from 'react';
import { getTempHistory } from '../../../../store/actions/application/weatherActions'
import { connect } from 'react-redux'
import LineGraph from '../../../Utils/LineGraph'
import {Typography} from '@material-ui/core';
import SnackbarContent from '@material-ui/core/SnackbarContent';

class TemperatureGraph extends Component {

    constructor() {
        super();
    
        this.state = {
            intervalId : null,
        };
    }

    componentDidMount() {
        this.fetchData()
        var intervalId = setInterval( this.fetchData, 150000);
        this.setState({intervalId: intervalId});
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.tempHistory.data != null) {
            return this.props.tempHistory.data != nextProps.tempHistory.data
        }
    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
     }
    
    fetchData = () => {
        this.props.dispatch(getTempHistory({ greenHouseId: this.props.greenHouseId }))
    }

    render() {
        const { tempHistory } = this.props
        const { data } = tempHistory

        if (tempHistory.isRejected) {
            return <SnackbarContent className="bg-red-light" message={"Error: "+tempHistory.data}/>
        }
        if (tempHistory.isLoading) {
            return <Typography variant="body1">Loading...</Typography>
        }
        if (data.errorMessage){
            return <SnackbarContent className="bg-red-light" message={data.errorMessage}/>
        }
        const history = []
        for (let index = 0; index < data.temperatureHistory.length; index++) {
            history[index] = data.temperatureHistory[index].currentTemperature;
        }
        
        const timeStamp = []
        for (let index = 0; index < data.temperatureHistory.length; index++) {
            timeStamp[index] = data.temperatureHistory[index].timeStamp.slice(11,13)+".00";
        }
        

        return (
            <div>
                <LineGraph history={history} timeStamp={timeStamp} name='ประวัติอุณหภูมิในวันนี้' yName='อุณหภูมิ'/>
            </div>
        )
    }
}

function mapStateToProps({application}) {
    return {
        tempHistory: application.weatherReducers.tempHistory,
    }
}

export default connect(mapStateToProps)(TemperatureGraph)
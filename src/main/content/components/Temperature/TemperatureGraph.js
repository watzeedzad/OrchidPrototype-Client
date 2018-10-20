 import React, { Component } from 'react';
import { getTempHistory } from '../../../../store/actions/application/weatherActions'
import { connect } from 'react-redux'
import LineGraph from '../../../Utils/LineGraph'
import {Typography} from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        this.props.dispatch(getTempHistory({ greenHouseId: 789456123 }))
    }

    render() {
        const { tempHistory } = this.props
        const { data } = tempHistory

        if (tempHistory.isRejected) {
            return <Typography variant="body1" className="alert alert-danger">Error: {tempHistory.data}</Typography>
        }
        if (tempHistory.isLoading) {
            return <Typography variant="body1">Loading...</Typography>
        }
        if (data.errorMessage){
            return <Typography variant="body1" className="alert alert-danger">{data.errorMessage}</Typography>
        }
        const history = []
        for (let index = 0; index < data.temperatureHistory.length; index++) {
            history[index] = data.temperatureHistory[index].currentTemperature;
        }
      
        return (
            <div>
                <LineGraph history={history} name='ประวัติอุณหภูมิในวันนี้' yName='อุณหภูมิ'/>
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
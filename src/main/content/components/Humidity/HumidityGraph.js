import React, { Component } from 'react';
import { getHumidityHistory } from '../../../../store/actions/application/weatherActions'
import { connect } from 'react-redux'
import LineGraph from '../../../Utils/LineGraph'
import {Typography} from '@material-ui/core';
import SnackbarContent from '@material-ui/core/SnackbarContent';

class HumidityGraph extends Component {
      
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
        if(nextProps.humidityHistory.data != null) {
            return this.props.humidityHistory.data != nextProps.humidityHistory.data
        }
    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    }
    
    fetchData = () => {
        this.props.dispatch(getHumidityHistory({ greenHouseId: 2 }))
    }

    render() {
        const { humidityHistory } = this.props
        const { data } = humidityHistory

        if (humidityHistory.isRejected) {
            return <SnackbarContent className="bg-red-light" message={"Error: "+humidityHistory.data}/>
        }
        if (humidityHistory.isLoading) {
            return <Typography variant="body1">Loading...</Typography>
        }
        if (data.errorMessage){
            return <SnackbarContent className="bg-red-light" message={data.errorMessage}/>
        }
        const history = []
        for (let index = 0; index < data.humidityHistory.length; index++) {
            history[index] = data.humidityHistory[index].currentHumidity;
        }
      
        return (
            <div>
                <LineGraph history={history} name='ประวัติความชื้นในอากาศของวันนี้' yName='ความชื้นในอากาศ'/>
            </div>
        )
    }
}

function mapStateToProps({application}) {
    return {
        humidityHistory: application.weatherReducers.humidityHistory,
    }
}

export default connect(mapStateToProps)(HumidityGraph)
import React, { Component } from 'react';
import { getMoistureHistory } from 'store/actions/application/planterActions'
import { connect } from 'react-redux'
import LineGraph from '../../../Utils/LineGraph'
import {Typography} from '@material-ui/core';
import SnackbarContent from '@material-ui/core/SnackbarContent';

class MoistureGraph extends Component {

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
        if(nextProps.moistureHistory.data != null) {
            return this.props.moistureHistory.data != nextProps.moistureHistory.data
        }
    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    }
    
    fetchData = () => {
        this.props.dispatch(getMoistureHistory({ greenHouseId: this.props.greenHouseId }))
    }

    render() {
        const { moistureHistory } = this.props
        const { data } = moistureHistory

        if (moistureHistory.isRejected) {
            return <SnackbarContent className="bg-red-light" message={"Error: "+moistureHistory.data}/>
        }
        if (moistureHistory.isLoading) {
            return <Typography variant="body1">Loading...</Typography>
        }
        if (data.errorMessage){
            return <SnackbarContent className="bg-red-light" message={data.errorMessage}/>
        }
        const history = []
        for (let index = 0; index < data.soilMoistureHistory.length; index++) {
            history[index] = data.soilMoistureHistory[index].currentSoilMoisture;
        }
        
        const timeStamp = []
        for (let index = 0; index < data.soilMoistureHistory.length; index++) {
            timeStamp[index] = data.soilMoistureHistory[index].timeStamp.slice(11,13)+".00";
        }

        return (
            <div>
                <LineGraph history={history} timeStamp={timeStamp} name='ประวัติความชื้นในเครื่องปลูกของวันนี้' yName='ความชื้นในเครื่องปลูก'/>
            </div>
        )
    }
}

function mapStateToProps({application}) {
    return {
        moistureHistory: application.planterReducers.moistureHistory,
    }
}

export default connect(mapStateToProps)(MoistureGraph)
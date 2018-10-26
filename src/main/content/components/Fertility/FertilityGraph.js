import React, { Component } from 'react';
import { getFertilityHistory } from 'store/actions/application/planterActions'
import { connect } from 'react-redux'
import LineGraph from '../../../Utils/LineGraph'
import {Typography} from '@material-ui/core';
import SnackbarContent from '@material-ui/core/SnackbarContent';

class FertilityGraph extends Component {

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
        if(nextProps.fertilityHistory.data != null) {
            return this.props.fertilityHistory.data != nextProps.fertilityHistory.data
        }
    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    }
    
    fetchData = () => {
        this.props.dispatch(getFertilityHistory({projectId: this.props.projectId}))
    }

    render() {
        const { fertilityHistory } = this.props
        const { data } = fertilityHistory

        if (fertilityHistory.isRejected) {
            return <SnackbarContent className="bg-red-light" message={"Error: "+fertilityHistory.data}/>
        }
        if (fertilityHistory.isLoading) {
            return <Typography variant="body1">Loading...</Typography>
        }
        if (data.errorMessage){
            return <SnackbarContent className="bg-red-light" message={data.errorMessage}/>
        }
        const history = []
        for (let index = 0; index < data.fertilityHistory.length; index++) {
            history[index] = data.fertilityHistory[index].currentFertility;
        }
      
        return (
            <div>
                <LineGraph history={history} name='ประวัติความอุดมสมบูรณ์ในเครื่องปลูกของวันนี้' yName='ปริมาณแร่ธาตุ'/>
            </div>
        )
    }
}

function mapStateToProps({application}) {
    return {
        fertilityHistory: application.planterReducers.fertilityHistory,
    }
}

export default connect(mapStateToProps)(FertilityGraph)
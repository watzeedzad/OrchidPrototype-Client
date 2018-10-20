import React, { Component } from 'react';
import { getTemp,saveTempConfig } from '../../../../store/actions/application/weatherActions'
import { connect } from 'react-redux'
import TemperatureGauge from '../Temperature/TemperatureGauge'
import SettingTemperature from '../Temperature/SettingTemperature'
import { Container, Row, Col } from 'reactstrap';
import {Typography} from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';

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
            return <Typography variant="body1" className="alert alert-danger">Error: {temp.data}</Typography>
        }
        if (temp.isLoading) {
            return <Typography variant="body1">Loading...</Typography>
        }
        if (data.errorMessage){
            return <Typography variant="body1" className="alert alert-danger">{data.errorMessage}</Typography>
        }
    
        return (
            <Container>
                <div>
                    <Row>
                        <Col xs='6' sm='6' md='6' lg='6' xl='6'>
                            <TemperatureGauge
                                minConfig={data.minConfigTemperature}
                                maxConfig={data.maxConfigTemperature}
                                currentValue={data.currentTemperature}
                            />
                        </Col>
                        <Col xs='6' sm='6' md='6' lg='6' xl='6'>
                            <SettingTemperature
                                minConfig={data.minConfigTemperature}
                                maxConfig={data.maxConfigTemperature}
                                onSubmit={this.onSubmit}
                            />
                        </Col>
                    </Row>
                </div>
            </Container>
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
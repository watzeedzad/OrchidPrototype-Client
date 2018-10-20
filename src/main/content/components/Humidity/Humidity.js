import React, { Component } from 'react';
import { getHumidity,saveHumidityConfig } from '../../../../store/actions/application/weatherActions'
import { connect } from 'react-redux'
import HumidityGauge from '../Humidity/HumidityGauge'
import SettingHumidity from '../Humidity/SettingHumidity'
import { Container, Row, Col } from 'reactstrap';
import {Typography} from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';

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
            return <Typography variant="body1" className="alert alert-danger">Error: {humidity.data}</Typography>
        }
        if (humidity.isLoading) {
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
                            <HumidityGauge
                                minConfig={data.minConfigHumidity}
                                maxConfig={data.maxConfigHumidity}
                                currentValue={data.currentHumidity}
                            />
                        </Col>
                        <Col xs='6' sm='6' md='6' lg='6' xl='6'>
                            <SettingHumidity
                                minConfig={data.minConfigHumidity}
                                maxConfig={data.maxConfigHumidity}
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
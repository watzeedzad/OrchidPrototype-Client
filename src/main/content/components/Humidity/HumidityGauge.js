import React, { Component } from 'react';
import Speedometer from '../../../Utils/Speedometer'
import {Typography} from '@material-ui/core';

class HumidityGauge extends Component {
    
    render() {
        if (!this.props.currentValue){
            return <Typography variant="body1" className="alert alert-danger">ไม่มีข้อมูลจากเซนเซอร์</Typography>
        }

        return (
            <Speedometer
                title={"ความชื้นในอากาศ ณ ปัจจุบัน"}
                min= {0}
                max= {100}
                minConfig={this.props.minConfig}
                maxConfig={this.props.maxConfig}
                currentValue={this.props.currentValue}
                minColor={"#C7F3FF"}
                midColor={"#51DBFF"}
                maxColor={"#00B9E9"} />
        )
    }
}

export default HumidityGauge
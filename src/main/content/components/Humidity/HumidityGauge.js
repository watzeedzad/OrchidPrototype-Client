import React, { Component } from 'react';
import Speedometer from '../../../Utils/Speedometer'

class HumidityGauge extends Component {
    
    render() {
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
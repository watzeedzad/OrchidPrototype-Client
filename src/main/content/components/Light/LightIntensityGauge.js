import React, { Component } from 'react';
import Speedometer from '../../../Utils/Speedometer'

class LightIntensityGauge extends Component {
    
    render() {

        return (
            <Speedometer
                title={"ความเข้มของแสง ณ ปัจจุบัน"}
                min= {0}
                max= {100}
                minConfig={this.props.minConfig}
                maxConfig={this.props.maxConfig}
                currentValue={this.props.currentValue}
                minColor={"#FFFFCC"}
                midColor={"#FFFF33"}
                maxColor={"#FF9933"} />
        )
    }
}

export default LightIntensityGauge
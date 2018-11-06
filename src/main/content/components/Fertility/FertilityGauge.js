import React, { Component } from 'react';
import Speedometer from '../../../Utils/Speedometer'

class FertilityGauge extends Component {

    render() {
        return (
            <Speedometer
                title={"ปริมาณแร่ธาตุ ณ ปัจจุบัน"}
                min={0}
                max={100}
                minConfig={this.props.minConfig}
                maxConfig={this.props.maxConfig}
                currentValue={this.props.currentValue}
                minColor={"#E8B79E"}
                midColor={"#D98559"}
                maxColor={"#BE5C2A"} />
        )
    }
}

export default FertilityGauge
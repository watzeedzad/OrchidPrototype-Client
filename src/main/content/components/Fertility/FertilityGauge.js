import React, { Component } from 'react';
import Speedometer from '../../../Utils/Speedometer'
import SnackbarContent from '@material-ui/core/SnackbarContent';

class FertilityGauge extends Component {

    render() {
        if (!this.props.currentValue){
            return <SnackbarContent className="bg-red-light" message="ไม่มีข้อมูลจากเซนเซอร์"/>
        }

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
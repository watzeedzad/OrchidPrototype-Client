import React, { Component } from 'react';
import Speedometer from '../../../Utils/Speedometer'
import SnackbarContent from '@material-ui/core/SnackbarContent';

class MoistureGauge extends Component {
    
    render() {
        if (!this.props.currentValue){
            return <SnackbarContent className="bg-red-light" message="ไม่มีข้อมูลจากเซนเซอร์"/>
        }

        return (
            <Speedometer
                title={"ความชื้นเครื่องปลูก ณ ปัจจุบัน"}
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

export default MoistureGauge
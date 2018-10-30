import React, { Component } from 'react';
import ReactProgressMeter  from 'react-progress-meter'
import SnackbarContent from '@material-ui/core/SnackbarContent';

class LightIntensityGauge extends Component {
    
    render() {
        if (this.props.currentProgress === null){
            return <SnackbarContent className="bg-red-light" message="ไม่มีข้อมูลในฐานข้อมูล"/>
        }

        return (
            <ReactProgressMeter 
                currentProgress={this.props.currentProgress} 
                showPercent={true}
                show={true}
                color="yellow" />
        )
    }
}

export default LightIntensityGauge
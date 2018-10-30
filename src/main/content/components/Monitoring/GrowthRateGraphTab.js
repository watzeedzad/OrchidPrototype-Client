import React, { Component } from 'react';
import GrowthRateGraph from '../../../Utils/GrowthRateGraph'
import {Typography, SnackbarContent} from '@material-ui/core';

class GrowthRateGraphTab extends Component {

    render() {
        const { growthRate } = this.props
        const { data } = growthRate

        if (growthRate.isRejected) {
            return <SnackbarContent className="bg-red-light" message={"Error: "+growthRate.data}/>
        }
        if (growthRate.isLoading) {
            return <Typography variant="body1">Loading...</Typography>
        }
        if (data.errorMessage){
            return <SnackbarContent className="bg-red-light" message={data.errorMessage}/>
        }
        const timeStamp = []
        for (let index = 0; index < data.length; index++) {
            timeStamp[index] = data[index].timeStamp.slice(0,10).replace(/-/g,'/');
        }

        const trunkDiameter = []
        for (let index = 0; index < data.length; index++) {
            trunkDiameter[index] = data[index].trunkDiameter;
        }

        const leafWidth = []
        for (let index = 0; index < data.length; index++) {
            leafWidth[index] = data[index].leafWidth;
        }

        const totalLeaf = []
        for (let index = 0; index < data.length; index++) {
            totalLeaf[index] = data[index].totalLeaf;
        }

        const height = []
        for (let index = 0; index < data.length; index++) {
            height[index] = data[index].height;
        }
      
        return (
            <div className="flex w-full flex-col ">
                {/* <div></div> */}
                <GrowthRateGraph timeStamp={timeStamp} data={trunkDiameter} name='อัตราการเจริญเติบโตทางเส้นผ่านศูนย์กลางลำต้น' yName='เส้นผ่านศูนย์กลางลำต้น'/>
                <GrowthRateGraph timeStamp={timeStamp} data={leafWidth} name='อัตราการเจริญเติบโตทางความกว้างของใบ' yName='ความกว้างของใบ'/>
                <GrowthRateGraph timeStamp={timeStamp} data={totalLeaf} name='อัตราการเจริญเติบโตทางจำนวนของใบ' yName='จำนวนใบ'/>
                <GrowthRateGraph timeStamp={timeStamp} data={height} name='อัตราการเจริญเติบโตทางความสูงของลำต้น' yName='ความสูงลำต้น'/>
            </div>
        )
    }
}

export default GrowthRateGraphTab
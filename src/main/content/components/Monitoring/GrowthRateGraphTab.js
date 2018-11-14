import React, { Component } from 'react';
import GrowthRateGraph from '../../../Utils/GrowthRateGraph'
import {Typography, SnackbarContent} from '@material-ui/core';

class GrowthRateGraphTab extends Component {

    render() {
        const { growthRate,compareGrowthRate } = this.props
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
        
        const trunkDiameter2 = []
        const leafWidth2 = []
        const totalLeaf2 = []
        const height2 = []
        console.log(growthRate,compareGrowthRate)
        if(!compareGrowthRate.isLoading){
            
            for (let index = 0; index < compareGrowthRate.data.length; index++) {
                trunkDiameter2[index] = compareGrowthRate.data[index].trunkDiameter;
            }

            for (let index = 0; index < compareGrowthRate.data.length; index++) {
                leafWidth2[index] = compareGrowthRate.data[index].leafWidth;
            }

            for (let index = 0; index < compareGrowthRate.data.length; index++) {
                totalLeaf2[index] = compareGrowthRate.data[index].totalLeaf;
            }

            for (let index = 0; index < compareGrowthRate.data.length; index++) {
                height2[index] = compareGrowthRate.data[index].height;
            }
        }
        return (
            <div className="flex w-full flex-col ">
                {/* <div></div> */}
                <GrowthRateGraph projectId={data[0].projectId} timeStamp={timeStamp} data={trunkDiameter} data2={trunkDiameter2} name='อัตราการเจริญเติบโตทางเส้นผ่านศูนย์กลางลำต้น' yName='เส้นผ่านศูนย์กลางลำต้น'/>
                <GrowthRateGraph projectId={data[0].projectId} timeStamp={timeStamp} data={leafWidth} data2={leafWidth2} name='อัตราการเจริญเติบโตทางความกว้างของใบ' yName='ความกว้างของใบ'/>
                <GrowthRateGraph projectId={data[0].projectId} timeStamp={timeStamp} data={totalLeaf} data2={totalLeaf2} name='อัตราการเจริญเติบโตทางจำนวนของใบ' yName='จำนวนใบ'/>
                <GrowthRateGraph projectId={data[0].projectId} timeStamp={timeStamp} data={height} data2={height2} name='อัตราการเจริญเติบโตทางความสูงของลำต้น' yName='ความสูงลำต้น'/>
            </div>
        )
    }
}

export default GrowthRateGraphTab
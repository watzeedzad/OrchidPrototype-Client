import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadGrowthRate, addGrowthRate, resetStatus } from 'store/actions/application/monitoringActions'
import {Button,SnackbarContent} from '@material-ui/core';
import GrowthRateForm from './GrowthRateForm'
import CSVModal from './CSVModal'
import GrowthRateGraphTab from './GrowthRateGraphTab';

class GrowthRateTab extends Component {
    //มีการใช้ Modal ของ reactstrap ซึ่งจะต้องเก็บ State การแสดง modal ไว้
    state = {
        dialog: false,
        csvDialog: false,
        dialogTitle: '',
        data: [],
        mss: ''
    }

    //สั่ง dispach ฟังก์ชัน loadUsers
    componentDidMount() {
        this.props.dispatch(loadGrowthRate({ greenHouseId: 789456123, projectId: 1 }))
    }

    render() {
        const { growthRate,growthRateSave } = this.props

        return (
            <div>
                <div className="p-24 pl-80">
                    {this.state.mss}
                </div>
                <div className="pl-80 pb-48">
                    <Button variant="contained" color="primary" onClick={this.csvToggle}>export ข้อมูล</Button>{' '}
                    <Button variant="contained" color="primary" onClick={this.handleNew}>เพิ่มข้อมูล</Button>
                </div>

                <GrowthRateGraphTab growthRate={growthRate}/>

                <GrowthRateForm
                    isOpen={this.state.dialog} 
                    dialogTitle={this.state.dialogTitle}
                    data={this.state.data}
                    growthRateSave={growthRateSave}
                    onSubmit={this.handleSubmit}
                    onToggle={this.toggle} />

                <CSVModal
                    isOpen={this.state.csvDialog} 
                    farmId={123456789}
                    greenHouseId={789456123}
                    projectId={1} 
                    onToggle={this.csvToggle}/>
            </div>
        )
    }

    //ฟังก์ชันสั่งแสดง/ปิด modal
    toggle = () => {
        this.setState({
            dialog: !this.state.dialog
        })
    }

    csvToggle = () => {
        this.setState({
            csvDialog: !this.state.csvDialog
        })
    }

    //ฟังก์ชันสร้างข้อมูลใหม่โดยจะสั่งให้เปิด Modal
    handleNew = () => {
        this.props.dispatch(resetStatus())

        this.setState({ dialogTitle: 'เพิ่ม' ,data:{greenHouseId: 789456123,projectId: 1}})
        this.toggle();
    }

    //ฟังก์ชันบันทึกข้อมูล
    handleSubmit = (values) => {
            this.props.dispatch(addGrowthRate(values)).then(() => {
                if (!this.props.growthRateSave.isRejected) {
                    this.toggle()
                    this.setState({
                        mss: <SnackbarContent className="bg-green-light" message="ทำการเพิ่มข้อมูลสำเร็จ"/>
                    })
                    this.props.dispatch(loadGrowthRate({greenHouseId: 789456123, projectId: 1 }))
                }
            })
    }

}

function mapStateToProps({application}) {
    return {
        growthRate: application.monitoringReducers.growthRate,
        growthRateSave: application.monitoringReducers.growthRateSave
    }
}

export default connect(mapStateToProps)(GrowthRateTab)
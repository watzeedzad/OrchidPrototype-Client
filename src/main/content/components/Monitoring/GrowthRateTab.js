import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadGrowthRate, addGrowthRate, resetStatus } from 'store/actions/application/monitoringActions'
import {Button,SnackbarContent,Typography} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import GrowthRateForm from './GrowthRateForm'
import CSVModal from './CSVModal'
import GrowthRateGraphTab from './GrowthRateGraphTab';
import { setNavigation } from 'store/actions/fuse/navigation.actions'
import { projectNavigation } from 'fuse-configs/fuseNavigationConfig';
import { selectProject } from 'store/actions/application/projectActions'

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
        this.props.dispatch(setNavigation(projectNavigation))
        if(this.props.location.state){
            this.props.dispatch(selectProject(this.props.location.state.project))
            this.props.dispatch(loadGrowthRate({ projectId: this.props.location.state.project.projectId }));
        }else if(!this.props.greenHouse.isLoading){
            this.props.dispatch(loadGrowthRate({projectId: this.props.project.data.projectId}));
        }
    }

    render() {
        const { growthRate,growthRateSave,project,greenHouse } = this.props
        console.log(this.props)
        if (project.isLoading || greenHouse.isLoading) {
            return <Typography variant="body1">Loading...</Typography>
        }

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
                    greenHouseId={greenHouse.data.greenHouseId}
                    projectId={project.data.projectId} 
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

        this.setState({ dialogTitle: 'เพิ่ม' ,data:{greenHouseId: this.props.greenHouse.data.greenHouseId,projectId: this.props.project.data.projectId}})
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
                    this.props.dispatch(loadGrowthRate({greenHouseId: this.props.greenHouse.data.greenHouseId,projectId: this.props.project.data.projectId}))
                }
            })
    }

}

function mapStateToProps({application}) {
    return {
        growthRate: application.monitoringReducers.growthRate,
        growthRateSave: application.monitoringReducers.growthRateSave,
        greenHouse: application.greenHouseReducers.greenHouse,
        project: application.projectReducers.project,
    }
}

export default connect(mapStateToProps)(withRouter(GrowthRateTab))
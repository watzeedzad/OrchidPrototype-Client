import React,{Component} from 'react';
import {connect} from 'react-redux';
import FertilizerTimeList from '../FertilizerControl/FertilizerTimeList';
import { getFertilizerTime } from 'store/actions/application/fertilizerActions'
import {Typography, Grid, SnackbarContent} from '@material-ui/core';
import { setNavigation } from 'store/actions/fuse/navigation.actions'
import { projectNavigation } from 'fuse-configs/fuseNavigationConfig';

class AutoFertilizerControl extends Component{
    
    state = {
        mss: '',
    }

    componentDidMount(){
        this.props.dispatch(setNavigation(projectNavigation))
        this.props.dispatch(getFertilizerTime({ projectId: this.props.projectId }))
    }

    render(){
        const {fertilizerTimeList} = this.props;

        if (fertilizerTimeList.isRejected) {
            return <SnackbarContent className="bg-red-light" message={"Error: "+fertilizerTimeList.data}/>
        }
        if (fertilizerTimeList.isLoading) {
            return <Typography variant="body1">Loading...</Typography>
        }
        if (fertilizerTimeList.data.errorMessage){
            return <SnackbarContent className="bg-red-light" message={fertilizerTimeList.data.errorMessage}/>
        }

        return(
            <Grid container spacing={24}>
                <Grid item xs={12} sm={12} md={12}>
                    <div className="pl-60 pt-40">
                        <Typography variant="headline">สั่งให้ปุ๋ยตามเวลา</Typography>
                    </div>
                    <FertilizerTimeList fertilizerTimeList={fertilizerTimeList}
                        projectId={this.props.projectId} 
                        onToggle={this.toggle}
                        onDelete={this.delete}  
                        mss={this.state.mss}/>
                </Grid>
            </Grid>
        );
    }
    
    toggle = ()=>{
        this.setState({
            mss: <SnackbarContent className="bg-green-light" message="บันทึกการตั้งค่าเวลาการให้ปุ๋ยสำเร็จ"/>
        });
        this.props.dispatch(getFertilizerTime({ projectId: this.props.projectId}))
    }

    delete = ()=>{
        this.setState({
            mss: <SnackbarContent className="bg-green-light" message="ทำการลบเวลาการให้ปุ๋ยสำเร็จ"/>
        });
        this.props.dispatch(getFertilizerTime({ projectId: this.props.projectId}))
    }
    
}

function mapStateToProps({application}) {
    return {
        fertilizerTimeList: application.fertilizerReducers.fertilizerTimeList,
    }
}

export default connect(mapStateToProps)(AutoFertilizerControl);
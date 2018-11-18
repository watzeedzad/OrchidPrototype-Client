import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageCarded, FuseAnimate} from '@fuse';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import FarmTable from 'main/content/components/FarmManagement/FarmTable';
import _ from '@lodash';
import {Button, Icon, Typography, SnackbarContent} from '@material-ui/core';
import FarmDialog from 'main/content/components/FarmManagement/FarmDialog';
import {loadFarms, addFarm, editFarm, resetStatus} from 'store/actions/application/farmActions';
import { confirmModalDialog } from 'main/Utils/reactConfirmModalDialog'
import { setSettings } from 'store/actions/fuse/settings.actions'
import {PageConfig} from '../../pages/PageConfig'
import UserDialog from '../UserManagement/UserDialog'
import {addUser} from 'store/actions/application/userActions';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right   : 12,
        bottom  : 12,
        zIndex  : 99
    }
});

class FarmTab extends Component {

    state = {
        dialog: false,
        dialog2: false,
        dialogTitle: '',
        data: [],
        userData: [],
        farmId: ''
    }

    componentDidMount()
    {
        this.props.dispatch(setSettings(PageConfig.adminSettings))
        this.props.dispatch(loadFarms())
    }

    render()
    {
        const {classes, farms, farmSave} = this.props;

        if (farms.isRejected) {
            return <SnackbarContent className="bg-red-light" message={"Error: "+farms.data}/>
        }

        return (
            <React.Fragment>
                <FusePageCarded
                    classes={{
                        contentCardWrapper: "p-16 sm:p-24 pb-80",
                        leftSidebar       : "w-256",
                        header            : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    header={
                        <div className="flex items-center">
                            <FuseAnimate animation="transition.expandIn" delay={300}>
                                <Icon className="text-32 mr-12">toys</Icon>
                            </FuseAnimate>
                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <Typography variant="h6" >จัดการข้อมูลฟาร์ม</Typography>
                            </FuseAnimate>
                        </div>
                    }
                    content={
                        <FarmTable
                            data={farms.data}
                            buttonCreate={this.handleNew}
                            buttonUserCreate={this.handleUserNew}
                            buttonEdit={this.handleEdit}
                        />
                    }
                    sidebarInner
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                    innerScroll
                />
                <FarmDialog
                    isOpen={this.state.dialog} 
                    dialogTitle={this.state.dialogTitle}
                    data={this.state.data}
                    farmSave={farmSave}
                    onSubmit={this.handleSubmit}
                    onToggle={this.toggle}/>
                <UserDialog
                    isOpen={this.state.dialog2} 
                    dialogTitle="เพิ่ม"
                    farmId={this.state.farmId}
                    onSubmit={this.handleUserSubmit}
                    onToggle={this.toggle2}/>
            </React.Fragment>
        )
    };

    toggle = () => {
        this.setState({
            dialog: !this.state.dialog,
        })
    }

    toggle2 = () => {
        this.setState({
            dialog2: !this.state.dialog2,
        })
    }

    handleUserNew = (farmId) => {
        this.props.dispatch(resetStatus())

        this.setState({farmId: farmId})
        this.toggle2();
    }

    handleUserSubmit = (values) => {
        this.props.dispatch(addUser(values)).then(() => {
            if (!this.props.userSave.isRejected) {
                this.toggle2();
                this.props.dispatch(loadFarms())
            }
        })
    }

    //ฟังก์ชันสร้างข้อมูลใหม่โดยจะสั่งให้เปิด Modal
    handleNew = () => {
        this.props.dispatch(resetStatus())

        this.setState({ dialogTitle: 'เพิ่ม' ,data: []})
        this.toggle();
    }

    //ฟังก์ชันแก้ไขข้อมูล และสั่งให้เปิด Modal โดยส่งข้อมูลไปแป๊ะให้กับฟอร์มด้วย
    handleEdit = (data) => {
        this.props.dispatch(resetStatus())
        
        this.setState({ dialogTitle: 'แก้ไข' ,data: data})
        this.toggle()
    }

    //ฟังก์ชันบันทึกข้อมูล
    handleSubmit = (values) => {

        if(this.state.dialogTitle === 'เพิ่ม'){
            this.props.dispatch(addFarm(values)).then(() => {
                if (!this.props.farmSave.isRejected) {
                    this.toggle()
                    this.props.dispatch(loadFarms())
                }
            })
        }else if(this.state.dialogTitle === 'แก้ไข'){
            this.props.dispatch(editFarm(values)).then(() => {
                if (!this.props.farmSave.isRejected) {
                    this.toggle()
                    this.props.dispatch(loadFarms())
                }
            })
        }
    }
}

function mapStateToProps({application})
{
    return {
        farms: application.farmReducers.farms,
        farmSave: application.farmReducers.farmSave,
        userSave: application.userReducers.userSave
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps)(FarmTab)))

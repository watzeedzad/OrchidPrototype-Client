import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple, FuseAnimate} from '@fuse';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import UserTable from 'main/content/components/UserManagement/UserTable';
import UserHeader from 'main/content/components/UserManagement/UserHeader';
import _ from '@lodash';
import {Button, Icon} from '@material-ui/core';
import UserDialog from 'main/content/components/UserManagement/UserDialog';
import {
    loadUsers, addUser, editUser,
    deleteUser, resetStatus, searchUsers
} from 'store/actions/application/userActions';
import { UncontrolledAlert } from 'reactstrap';
import { confirmModalDialog } from 'main/Utils/reactConfirmModalDialog'

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right   : 12,
        bottom  : 12,
        zIndex  : 99
    }
});

class UserTab extends Component {

    state = {
        dialog: false,
        dialogTitle: '',
        data: [],
        mss: ''
    }

    componentDidMount()
    {
        this.props.dispatch(loadUsers({farmId: 123456789}))
    }

    render()
    {
        const {classes, users, userSave} = this.props;

        if (users.isRejected) {
            //ถ้ามี error
            return <div className="alert alert-danger">Error:{users.data}</div>
        }

        return (
            <React.Fragment>
                <FusePageSimple
                    classes={{
                        contentCardWrapper: "p-16 sm:p-24 pb-80",
                        leftSidebar       : "w-256",
                        header            : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    header={
                        <UserHeader 
                        pageLayout={() => this.pageLayout}
                        handleSearch={this.handleSearch}/>
                    }
                    content={
                        <UserTable
                            data={users.data}
                            buttonEdit={this.handleEdit}
                            buttonDelete={this.handleDelete}        
                        />
                    }
                    sidebarInner
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                    innerScroll
                />
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Button
                        variant="fab"
                        color="primary"
                        aria-label="add"
                        className={classes.addButton}
                        onClick={this.handleNew}
                    >
                        <Icon>person_add</Icon>
                    </Button>
                </FuseAnimate>
                <UserDialog
                    isOpen={this.state.dialog} 
                    dialogTitle={this.state.dialogTitle}
                    data={this.state.data}
                    userSave={userSave}
                    onSubmit={this.handleSubmit}
                    onToggle={this.toggle}/>

            </React.Fragment>
        )
    };

    toggle = () => {
        this.setState({
            dialog: !this.state.dialog
        })
    }

    //ฟังก์ชัน filter ข้อมูล
    handleSearch = (term) => {
        this.props.dispatch(searchUsers({farmId:123456789,term:term}))
    }

    //ฟังก์ชันสร้างข้อมูลใหม่โดยจะสั่งให้เปิด Modal
    handleNew = () => {
        this.props.dispatch(resetStatus())

        this.setState({ dialogTitle: 'เพิ่ม' ,data:{farmId:123456789}})
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
            this.props.dispatch(addUser(values)).then(() => {
                if (!this.props.userSave.isRejected) {
                    this.toggle()
                    this.setState({
                        mss: 
                            <div>
                                <UncontrolledAlert  color="success">
                                    ทำการเพิ่มข้อมูลผู้ใช้สำเร็จ
                                </UncontrolledAlert >
                            </div>
                      })
                    this.props.dispatch(loadUsers({farmId: 123456789}))
                }
            })
        }else if(this.state.dialogTitle === 'แก้ไข'){
            this.props.dispatch(editUser(values)).then(() => {
                if (!this.props.userSave.isRejected) {
                    this.toggle()
                    this.setState({
                        mss: 
                            <div>
                                <UncontrolledAlert  color="success">
                                    ทำการแก้ไขข้อมูลผู้ใช้สำเร็จ
                                </UncontrolledAlert >
                            </div>
                    })
                    this.props.dispatch(loadUsers({farmId: 123456789}))
                }
            })
        }
    }

    //ฟังก์ชันลบข้อมูล
    handleDelete = (id) => {
        confirmModalDialog({
            show: true,
            title: 'ยืนยันการลบ',
            message: 'คุณต้องการลบข้อมูลนี้ใช่หรือไม่',
            confirmLabel: 'ยืนยัน ลบทันที!!',
            onConfirm: () => this.props.dispatch(deleteUser({id:id})).then(() => {
                this.props.dispatch(loadUsers({farmId: 123456789}))
            })
        })
    }
}

function mapStateToProps({application})
{
    return {
        users: application.userReducers.users,
        userSave: application.userReducers.userSave

    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps)(UserTab)))

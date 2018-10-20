import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import {
     Button, Dialog, DialogActions, DialogContent, Typography, Toolbar, AppBar
} from '@material-ui/core';


//รูปแบบการเขียนต่อไปนี้จะเข้าใจยากครับต้องใช้เวลานานเพื่อทำและทดสอบ
//มันเป็นรูปแบบของการสร้าง Element 

export default class ReactConfirmModalDialog extends Component {
    //เก็บ State เพื่อกำหนดว่าจะให้แสดง Modal หรือไม่
    state = {
        modal: this.props.show
    }

    //ใช้งาน PropTypes เป็นการเช็คค่า Props ที่ส่งเข้ามาว่าตรงตามที่เรากำหนดหรือไม่
    //เหมือนการตรวจสอบการทำงานของโปรแกรมเพื่อไม่ให้เกิดข้อผิดพลาด
    static propTypes = {
        type: PropTypes.string, //รับค่าตัวข้อความ warning, info
        show: PropTypes.bool,   //รับค่า true , false เพื่อกำหนดว่าจะแสดง Modal หรือไม่
        title: PropTypes.string,    //รับค่าข้อความเพื่อแสดงหัวของ Modal
        message: PropTypes.string,  //ข้อความที่ต้องการให้ปรากฏใน Modal
        confirmLabel: PropTypes.string, //ข้อความปุ่มยืนยัน
        cancelLabel: PropTypes.string,  //ข้อความปุ่มยกเลือก
        onConfirm: PropTypes.func,  //เมื่อยืนยันจะให้เรียกใช้ function อะไร
        onCancel: PropTypes.func,   //เมื่อยกเลือกจะให้เรียกใช้ function อะไร
        children: PropTypes.node,   //สามารถระบุ element ย่อยได้ ปกติจะไม่ได้ใช้
    };

    //กำหนด Default Props
    static defaultProps = {
        type: 'warning',
        show: false,
        title: '',
        message: '',
        childrenElement: () => null,
        confirmLabel: '',
        cancelLabel: 'ปิด',

    };

    //ควบคุมการแสดง Modal
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })

        const target = document.getElementById('react-widget-dialog');
        if (target) {
            target.parentNode.removeChild(target);
        }
    }

    onClickConfirm = () => {
        this.props.onConfirm();
        this.toggle()
    };

    onClickCancel = () => {
        this.props.onCancel();
        this.toggle()
    };

    render() {
        const {classes, title, message, confirmLabel, cancelLabel, type } = this.props;

        let buttonColor, modalColor;
        switch (type) {
            case 'info':
                buttonColor = "info";
                modalColor = "modal-info";
                break;
            default:
                buttonColor = "warning";
                modalColor = "modal-warning";
                break;
        }
        
        return (
            <Dialog
                // classes={{
                //     root : classes.root,
                //     paper: "m-24"
                // }}
                //className={modalColor}
                onClose={this.toggle}
                open={this.state.modal}
                //fullWidth
                maxWidth="xs"
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        {/* <Typography variant="body2" color="inherit"> */}
                            {title}
                        {/* </Typography> */}
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    {/* <Typography variant="body2" color="inherit"> */}
                        <br/>{message}
                    {/* </Typography>    */}
                </DialogContent>
                <DialogActions className="justify-between pl-16"> 
                <Button variant="raised" color={buttonColor} onClick={this.toggle}>{cancelLabel}</Button>
                    {confirmLabel && <Button variant="raised" color="primary" onClick={this.onClickConfirm}>
                    {confirmLabel}</Button>}
                </DialogActions>
            </Dialog>                  
        )
    }
}

//ฟังก์ชันสร้าง Element โดยจะวาดลงภายใน Div
function createElementDialog(properties) {
    const divTarget = document.createElement('div');
    divTarget.id = 'react-widget-dialog';
    document.body.appendChild(divTarget);
    render(<ReactConfirmModalDialog {...properties} />, divTarget);
}

//สุดท้ายส่งออกเป็นชื่อ confirmModalDialog
export function confirmModalDialog(properties) {
    createElementDialog(properties);
}
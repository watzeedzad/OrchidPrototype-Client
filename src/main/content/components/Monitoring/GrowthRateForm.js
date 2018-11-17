import React, { Component } from 'react'
import {
    Button, Dialog, DialogActions, DialogContent, Icon, Typography, Toolbar, AppBar, SnackbarContent
} from '@material-ui/core';
import {TextFieldFormsy} from '@fuse';
import Formsy, { addValidationRule }from 'formsy-react';
import {withStyles} from '@material-ui/core/styles/index';
import _ from '@lodash';

const styles = theme => ({
    root       : {},
    formControl: {
        marginBottom: 24
    }
});

addValidationRule('monitoringSetting', (values, value) => {
    value = parseFloat(value)
    if(value < 0){
        return false;
    }
    return true;
});

class GrowthRateForm extends Component {

    state = {
        timeStamp: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
        trunkDiameter: '',
        leafWidth: '',
        totalLeaf: '',
        height: '',
        canSubmit: false
    };

    form = React.createRef();

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    render() {
        const { classes,dialogTitle,growthRateSave } = this.props
        const {canSubmit} = this.state;        
        
        return (
            <Dialog
                classes={{
                    root : classes.root,
                    paper: "m-24"
                }}
                className={classes.root}
                onClose={this.toggle}
                open={this.props.isOpen}
                fullWidth
                maxWidth="xs"
            >

            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        {dialogTitle}การเจริญเติบโต
                    </Typography>
                </Toolbar>
            </AppBar>
            
            <Formsy
                onValidSubmit={this.onSubmit}
                onValid={this.enableButton}
                onInvalid={this.disableButton}
                ref={(form) => this.form = form}
                className="flex flex-col justify-center"
            >
                <DialogContent classes={{root: "p-24"}}>
                    {growthRateSave.isRejected &&
                        <div className="flex">
                            <div className="min-w-48 pt-20">
                            </div>
                            <SnackbarContent className="bg-green-light" message={growthRateSave.data}/>
                        </div>
                    }

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">calendar_today</Icon>
                        </div>
                        
                        <TextFieldFormsy
                            className={classes.formControl}
                            label="วันที่"
                            autoFocus
                            type="text"
                            id="timeStamp"
                            name="timeStamp"
                            value={this.state.timeStamp}
                            onChange={this.handleChange}
                            variant="outlined"
                            disabled
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                        </div>
                        
                        <TextFieldFormsy
                            className={classes.formControl}
                            label="เส้นผ่านศูนย์กลางลำต้น"
                            type="number"
                            id="trunkDiameter"
                            name="trunkDiameter"
                            value={this.state.trunkDiameter}
                            onChange={this.handleChange}
                            validations="monitoringSetting"
                            validationError="ต้องมีค่ามากกว่า 0"
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                        </div>
                        
                        <TextFieldFormsy
                            className={classes.formControl}
                            label="ความกว้างใบ (ซม.)"
                            type="number"
                            id="leafWidth"
                            name="leafWidth"
                            value={this.state.leafWidth}
                            onChange={this.handleChange}
                            validations="monitoringSetting"
                            validationError="ต้องมีค่ามากกว่า 0"
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                        </div>
                        
                        <TextFieldFormsy
                            className={classes.formControl}
                            label="จำนวนใบ"
                            type="number"
                            id="totalLeaf"
                            name="totalLeaf"
                            value={this.state.totalLeaf}
                            onChange={this.handleChange}
                            validations="monitoringSetting"
                            validationError="ต้องมีค่ามากกว่า 0"
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                        </div>
                        
                        <TextFieldFormsy
                            className={classes.formControl}
                            label="ความสูง (ซม.)"
                            type="number"
                            id="height"
                            name="height"
                            value={this.state.height}
                            onChange={this.handleChange}
                            validations="monitoringSetting"
                            validationError="ต้องมีค่ามากกว่า 0"
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                    <TextFieldFormsy
                        type="hidden"
                        id="greenHouseId"
                        name="greenHouseId"
                        value={this.props.data.greenHouseId}
                        onChange={this.handleChange}
                    />

                    <TextFieldFormsy
                        type="hidden"
                        id="projectId"
                        name="projectId"
                        value={this.props.data.projectId}
                        onChange={this.handleChange}
                    />

                </DialogContent>

                <DialogActions className="justify-between pl-16">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!canSubmit}
                    >
                        บันทึก
                </Button>

                </DialogActions>

            </Formsy>

            </Dialog>
        )
    }

    //ฟังก์ชันนี้เรียกใช้ props ชื่อ onToggle จาก src/pages/User.js เพื่อปิด Modal
    toggle = () => {
        this.props.onToggle()
    }

    //ฟังก์ชันส่งการค่าการ submit โดยส่งให้ฟังก์ชันชื่อ onSubmit ที่ได้จาก props
    onSubmit = (values) => {
        this.props.onSubmit(values);
    }
}

//validate ข้อมูลก่อน submit
function validate(values) {
    const errors = {};
    if (!values.name) {
        errors.name = 'จำเป็นต้องกรอกชื่อ-สกุล';
    }

    if (!values.username) {
        errors.username = 'จำเป็นต้องกรอก Username !';
    } else if (values.username.length < 3) {
        errors.username = 'Username ต้องมากกว่า 3 ตัวอักษร !';
    }

    return errors;
}

export default withStyles(styles, {withTheme: true})(GrowthRateForm)
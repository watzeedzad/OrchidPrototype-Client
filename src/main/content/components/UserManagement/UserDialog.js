import React, {Component} from 'react';
import {
    FormControlLabel, Radio, Button, Dialog, DialogActions, DialogContent, Icon, Typography, Toolbar, AppBar
} from '@material-ui/core';
import {TextFieldFormsy, RadioGroupFormsy} from '@fuse';
import Formsy, { addValidationRule } from 'formsy-react';
import {withStyles} from '@material-ui/core/styles/index';
import _ from '@lodash';

const styles = theme => ({
    root       : {},
    formControl: {
        marginBottom: 24
    }
});

addValidationRule('repasswordCheck', (values, value, otherField) => {
    return value === values[otherField];
});

class UserDialog extends Component {

    constructor() {
        super();
        this.state = {
            role : 'เจ้าของฟาร์ม',
            firstname : '',
            lastname : '',
            username : '',
            password : '',
            repassword : '',
            canSubmit: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
    }

    form = React.createRef();

    componentWillReceiveProps(nextProps){
        const {data} = nextProps
        if(data){
            if (data._id) {
                this.setState({ 
                    role : data.role,
                    firstname : data.firstname,
                    lastname : data.lastname,
                    username : data.username,
                    password : data.password,
                    repassword : data.password
                })
            }else {
                this.setState({ 
                    role : 'เจ้าของฟาร์ม',
                    firstname : '',
                    lastname : '',
                    username : '',
                    password : '',
                    repassword : ''
                })
            }
        }
    }

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    handleRadioChange() {
        if(this.state.role === 'เจ้าของฟาร์ม'){
            this.setState({
                role: 'พนักงาน'
            })
        }else{
            this.setState({
                role: 'เจ้าของฟาร์ม'
            })
        }
    }

    render()
    {
        const {classes, dialogTitle} = this.props;

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
                            {dialogTitle}ผู้ใช้
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
                        <div className="flex">
                            <div className="min-w-48 pt-20">
                                <Icon color="action">account_circle</Icon>
                            </div>
                            
                            <TextFieldFormsy
                                className={classes.formControl}
                                label="ชื่อ"
                                autoFocus
                                type="text"
                                id="firstname"
                                name="firstname"
                                value={this.state.firstname}
                                onChange={this.handleChange}
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
                                label="นามสกุล"
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={this.state.lastname}
                                onChange={this.handleChange}
                                variant="outlined"
                                fullWidth
                                required
                            />
                        </div>

                        <div className="flex">
                            <div className="min-w-48 pt-20">
                            </div>
                            <TextFieldFormsy
                                className={classes.formControl}
                                label="ไอดีผู้ใช้งาน"
                                type="text"
                                id="username"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                                validations={{
                                    minLength: 4                          
                                }}
                                validationErrors={{
                                    minLength: 'ต้องมีความยาวมากกว่า 4 ตัวอักษร'
                                }}
                                variant="outlined"
                                fullWidth
                                required
                            />
                        </div>

                        <div className="flex">
                            <div className="min-w-48 pt-20">
                            </div>
                            <RadioGroupFormsy
                                className="my-24"
                                name="role"
                                label="ประเภทผู้ใช้"
                                value={this.state.role}
                                required
                            >
                                <FormControlLabel 
                                    value="เจ้าของฟาร์ม" 
                                    control={<Radio color="primary"/>} 
                                    label="เจ้าของฟาร์ม"
                                    onChange={this.handleRadioChange}/>
                                <FormControlLabel 
                                    value="พนักงาน" 
                                    control={<Radio color="primary"/>} 
                                    label="พนักงาน"
                                    onChange={this.handleRadioChange}/>                                                
                            </RadioGroupFormsy>
                        </div>
                        {this.props.data &&this.props.data._id  ?
                        null 
                        : <div>
                            <div className="flex">
                                <div className="min-w-48 pt-20">
                                    <Icon color="action">vpn_key</Icon>
                                </div>
                                <TextFieldFormsy
                                    className={classes.formControl}
                                    label="รหัสผ่าน"
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    validations={{
                                        minLength: 4                          
                                    }}
                                    validationErrors={{
                                        minLength: 'ต้องมีความยาวมากกว่า 4 ตัวอักษร'
                                    }}
                                    fullWidth
                                    required
                                />
                            </div>
                            <div className="flex">
                                <div className="min-w-48 pt-20">
                                </div>
                                <TextFieldFormsy
                                    className={classes.formControl}
                                    label="ยืนยันรหัสผ่าน"
                                    type="password"
                                    id="repassword"
                                    name="repassword"
                                    value={this.state.repassword}
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    validations="repasswordCheck:password"
                                    validationError="ยืนยันรหัสผ่านไม่ตรงกับรหัสผ่านที่กรอกมา"
                                    required
                                />
                            </div>
                        </div>
                        }
                        {this.props.data && this.props.data._id &&
                        <TextFieldFormsy
                            className={classes.formControl}
                            autoFocus
                            type="hidden"
                            id="_id"
                            name="_id"
                            value={this.props.data._id}
                            onChange={this.handleChange}
                        />}
                        
                        <TextFieldFormsy
                            className={classes.formControl}
                            autoFocus
                            type="hidden"
                            id="farmId"
                            name="farmId"
                            value={this.props.farmId}
                            onChange={this.handleChange}
                        />
                    </DialogContent>

                    <DialogActions className="justify-between pl-16">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={!this.state.canSubmit}
                        >
                            บันทึก
                       </Button>
 
                    </DialogActions>
                
                </Formsy>

            </Dialog>
        );
    }

    toggle = () => {
        this.props.onToggle()
    }

    //ฟังก์ชันส่งการค่าการ submit โดยส่งให้ฟังก์ชันชื่อ onSubmit ที่ได้จาก props
    onSubmit = (values) => {
        this.props.onSubmit(values);
    }
}

export default withStyles(styles, {withTheme: true})(UserDialog);

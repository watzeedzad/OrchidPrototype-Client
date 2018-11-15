import React, { Component } from 'react';
import {
    MenuItem, FormControlLabel, Radio, Button, Dialog, DialogActions, DialogContent, Icon, Typography, Toolbar, AppBar
} from '@material-ui/core';
import {TextFieldFormsy, CheckboxFormsy, RadioGroupFormsy, SelectFormsy} from '@fuse';
import { connect } from 'react-redux';
import { getDropdownController } from 'store/actions/application/controllerActions';
import Formsy from 'formsy-react';
import _ from '@lodash';
import {withStyles} from '@material-ui/core/styles/index';

const styles = theme => ({
    root       : {},
    formControl: {
        marginBottom: 24
    }
});

class ControllerForm extends Component {

    constructor() {
        super();
    
        this.state = {
            greenHouseId: '',
            projectId: '',
            name: '',
            mac_address: null,
            isHaveRelay: false,
            water:false,
            fertilizer:false,
            moisture:false,
            light:false,
            canSubmit: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleWaterChange = this.handleWaterChange.bind(this);
        this.handleFertilizerChange = this.handleFertilizerChange.bind(this);
        this.handleMoistureChange = this.handleMoistureChange.bind(this);
        this.handleLightChange = this.handleLightChange.bind(this);
    }

    componentDidMount() {
        //เรียกใช้ฟังก์ชันในการกำหนด value ให้กับ textbox และ control ต่างๆ
        if(!this.props.data._id){
            this.props.dispatch(getDropdownController({ farmId: 123456789 }))
        }        
    }

    form = React.createRef();

    componentWillReceiveProps(nextProps){
        const {data} = nextProps
        if (data._id) {
            this.setState({ 
                greenHouseId: data.greenHouseId,
                projectId: data.projectId,
                name: data.name,
                isHaveRelay: data.isHaveRelay,
                water: data.relayType.water,
                fertilizer: data.relayType.fertilizer,
                moisture: data.relayType.moisture,
                light: data.relayType.light,
                mac_address: data.mac_address

            })
        }else {
            this.setState({ 
                greenHouseId: data.greenHouseId,
                projectId: data.projectId,
                name: '',
                isHaveRelay: false,
                water: false,
                fertilizer: false,
                moisture: false,
                light: false,
                mac_address: null,
            })
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
        this.setState({
            isHaveRelay: !this.state.isHaveRelay
        })
    }

    handleWaterChange() {
        this.setState({
            water: !this.state.water
        })
    }

    handleFertilizerChange() {
        this.setState({
            fertilizer: !this.state.fertilizer
        })
    }

    handleMoistureChange() {
        this.setState({
            moisture: !this.state.moisture
        })
    }

    handleLightChange() {
        this.setState({
            light: !this.state.light
        })
    }

    render() {
        //redux-form จะมี props ที่ชื่อ handleSubmit เพื่อใช้ submit ค่า
        const { classes, dropdownController, dialogTitle } = this.props

        if (!this.props.data._id && dropdownController.isLoading) {
            return <Typography variant="body1">Loading...</Typography>
        }
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
                            {dialogTitle}คอนโทรลเลอร์
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
                            {!this.props.data._id  
                            ?   <SelectFormsy
                                    className={classes.formControl}
                                    name="mac_address"
                                    label="กรุณาเลือกคอนโทรลเลอร์"
                                    value="none"
                                >
                                    {dropdownController.data == null || dropdownController.data.errorMessage ?
                                        <MenuItem value="none">
                                            <em>ไม่มีคอนโทรลเลอร์ในระบบ</em>
                                        </MenuItem>
                                    :   
                                        dropdownController.data.map(e =>{
                                            return(
                                                <MenuItem value={e.mac_address}>{e.mac_address}</MenuItem>
                                            )
                                        })
                                    }
                                </SelectFormsy>
                            :   <TextFieldFormsy
                                    className={classes.formControl}
                                    label="รหัสเครื่อง"
                                    type="text"
                                    id="mac_address"
                                    name="mac_address"
                                    value={this.state.mac_address}
                                    variant="outlined"
                                    disabled
                                    fullWidth
                                />
                            }
                        </div>

                        <div className="flex">
                            <div className="min-w-48 pt-20">
                                {/* <Icon color="action">account_circle</Icon> */}
                            </div>
                            
                            <TextFieldFormsy
                                className={classes.formControl}
                                label="ชื่อ"
                                autoFocus
                                type="text"
                                id="name"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                                variant="outlined"
                                required
                                fullWidth
                            />
                        </div>

                        <div className="flex">
                            <div className="min-w-48 pt-20">
                            </div>
                            <RadioGroupFormsy
                                className="my-24"
                                name="isHaveRelay"
                                label="ประเภทคอนโทรลเลอร์"
                                value={this.state.isHaveRelay}
                                required
                            >
                                <FormControlLabel 
                                    value={true}
                                    control={<Radio color="primary"/>} 
                                    label="มีรีเลย์"
                                    onChange={this.handleRadioChange}/>
                                <FormControlLabel 
                                    value={false}
                                    control={<Radio color="primary"/>} 
                                    label="ไม่มีรีเลย์"
                                    onChange={this.handleRadioChange}/>                                                
                            </RadioGroupFormsy>
                        </div>
                        {this.state.isHaveRelay
                        ?   <div>
                                <div className="flex">
                                    <div className="min-w-48 pt-20">
                                        {/* <Icon color="action">account_circle</Icon> */}
                                    </div>
                                    <Typography variant="subtitle1">ประเภทของรีเลย์</Typography>
                                </div> 
                                <div className="flex">
                                    <div className="min-w-48 pt-20">
                                        {/* <Icon color="action">account_circle</Icon> */}
                                    </div>
                                    
                                    <CheckboxFormsy
                                        name="water"
                                        label="ปั๊มน้ำ"
                                        value={this.state.water}
                                        checked={this.state.water}
                                        onChange={this.handleWaterChange}
                                    />
                                    <CheckboxFormsy
                                        className="ml-32"
                                        name="fertilizer"
                                        label="ปั๊มปุ๋ย"
                                        value={this.state.fertilizer}
                                        checked={this.state.fertilizer}
                                        onChange={this.handleFertilizerChange}
                                    />
                                </div>

                                <div className="flex">
                                    <div className="min-w-48 pt-20">
                                        {/* <Icon color="action">account_circle</Icon> */}
                                    </div>
                                    
                                    <CheckboxFormsy
                                        className={classes.formControl}
                                        name="moisture"
                                        label="ปั๊มความชื้น"
                                        value={this.state.moisture}
                                        checked={this.state.moisture}
                                        onChange={this.handleMoistureChange}
                                    />
                                    <CheckboxFormsy
                                        className={classes.formControl}
                                        name="light"
                                        label="หลอดไฟ"
                                        value={this.state.light}
                                        checked={this.state.light}
                                        onChange={this.handleLightChange}
                                    />
                                </div>
                            </div>                
                        :   null}
                        <TextFieldFormsy
                            className={classes.formControl}
                            autoFocus
                            type="hidden"
                            id="greenHouseId"
                            name="greenHouseId"
                            value={this.state.greenHouseId}
                            onChange={this.handleChange}
                        />
                        <TextFieldFormsy
                            className={classes.formControl}
                            autoFocus
                            type="hidden"
                            id="projectId"
                            name="projectId"
                            value={this.state.projectId}
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
        )
    }

    toggle = () => {
        this.props.onToggle()
    }

    onSubmit = (values) => {
        this.props.onSubmit(values);
    }
}

function mapStateToProps({application}) {
    return {
        dropdownController: application.controllerReducers.dropdownController,
    }
  }

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps)(ControllerForm))
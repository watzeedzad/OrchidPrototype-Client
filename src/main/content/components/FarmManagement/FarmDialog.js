import React, {Component} from 'react';
import {
    FormControlLabel, Radio, Button, Dialog, DialogActions, DialogContent, Icon, Typography, Toolbar, AppBar
} from '@material-ui/core';
import {TextFieldFormsy, RadioGroupFormsy} from '@fuse';
import Formsy, { addValidationRule } from 'formsy-react';
import {withStyles} from '@material-ui/core/styles/index';
import _ from '@lodash';


const styles = theme => ({
    root : {},
    formControl: {
        marginBottom: 24
    }
});

addValidationRule('isPiMacAddress', (values, value) => {
    return /^(([0-9A-Za-z]{2}))-([0-9A-Za-z]{2})-([0-9A-Za-z]{2})-([0-9A-Za-z]{2})-([0-9A-Za-z]{2})-([0-9A-Za-z]{2})$/.test(value);
});


class FarmDialog extends Component{
    constructor(){
        super();
        this.state={
            farmName : '',
            ownerName : '',
            ownerSurname : '',
            ownerTel : '',
            ownerAddress  : '',
            configFilePath : '',
            piMacAddress : '',
            canSubmit : false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    form = React.createRef();

    componentWillReceiveProps(nextProps){
        const {data} = nextProps
        if(data._id){
            this.setState({
                farmName : data.farmName,
                ownerName : data.ownerName,
                ownerSurname : data.ownerSurname,
                ownerTel : data.ownerTel,
                ownerAddress : data.ownerAddress,
                configFilePath: data.configFilePath,
                piMacAddress : data.piMacAddress
            })
        }else{
            this.setState({
                farmName : '',
                ownerName : '',
                ownerSurname : '',
                ownerTel : '',
                ownerAddress : '',
                configFilePath : '',
                piMacAddress : ''
            });
        }
    }

    disableButton = () =>{
        this.setState({canSubmit: false});
    };

    enableButton = () =>{
        this.setState({canSubmit: true});
    }
     
    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name ));
    }

    render(){

        const {classes, dialogTitle ,fileChangedHandler} = this.props;
        console.log(this.props.data)
        return(
            <Dialog
                classes={{
                    root : classes.root ,
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
                        {dialogTitle}ฟาร์ม
                    </Typography>
                </Toolbar>
            </AppBar>

                <Formsy 
                    onValidSubmit = {this.onSubmit}
                    onValid = {this.enableButton}
                    onInvalid = {this.disableButton}
                    ref = {(form) => this.form = form}
                    className = "felx flex-col justify-center"
                >
                    <DialogContent classes={{root: "p-24"}}>
                        <div className="flex">
                            <TextFieldFormsy
                                className={classes.formControl}
                                label="ชื่อฟาร์ม"
                                autoFocud
                                type="text"
                                id="farmName"
                                name="farmName"
                                value={this.state.farmName}
                                variant="outlined"
                                required
                                fullWidth
                            />
                        </div>


                        <div className="flex">
                            <TextFieldFormsy
                                className={classes.formControl}
                                label="ชื่อเจ้าของฟาร์ม"
                                type="text"
                                id="ownerName"
                                name="ownerName"
                                value={this.state.ownerName}
                                variant="outlined"
                                required
                                fullWidth
                            />      
                        </div>

                        
                        <div className="flex">
                            <TextFieldFormsy
                                className={classes.formControl}
                                label="นามสกุลเจ้าของฟาร์ม"
                                type="text"
                                id="ownerSurname"
                                name="ownerSurname"
                                value={this.state.ownerSurname}
                                variant="outlined"
                                required
                                fullWidth
                            />      
                        </div>


                        <div className="flex">
                            <TextFieldFormsy
                                className={classes.formControl}
                                label="เบอร์โทร์ศัพท์"
                                type="text"
                                id="ownerTel"
                                name="ownerTel"
                                value={this.state.ownerTel}
                                variant="outlined"
                                required
                                fullWidth
                            />      
                        </div>

                        <div className="flex">
                            <TextFieldFormsy
                                className={classes.formControl}
                                label="ที่อยู่"
                                type="text"
                                id="ownerAddress"
                                name="ownerAddress"
                                value={this.state.ownerAddress}
                                variant="outlined"
                                required
                                fullWidth
                            />      
                        </div>

                        <div className="flex">
                                <TextFieldFormsy
                                    className={classes.formControl}
                                    label="Pi-MacAddress (xx-xx-xx-xx-xx-xx)"
                                    type="text"
                                    id="piMacAddress"
                                    name="piMacAddress"
                                    value={this.state.piMacAddress}
                                    validations="isPiMacAddress"
                                    validationError="ต้องอยู่ในรูปแบบ xx-xx-xx-xx-xx-xx"
                                    variant="outlined"
                                    required
                                    fullWidth
                                />      
                        </div>

                            <TextFieldFormsy
                                className={classes.formControl}
                                autoFocus
                                type="hidden"
                                id="_id"
                                name="_id"
                                value={this.props.data._id}
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


export default withStyles(styles, {withTheme:true})(FarmDialog)
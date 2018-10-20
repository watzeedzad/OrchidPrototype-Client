import React, { Component } from 'react';
import Formsy from 'formsy-react';
import {TextFieldFormsy} from '@fuse';
import {withStyles} from '@material-ui/core/styles/index';
import {Button, Card, CardContent, Typography, Icon, InputAdornment,CssBaseline} from '@material-ui/core';

const styles = theme => ({
    layout: {
      width: 'auto',
      display: 'block', // Fix IE11 issue.
      marginTop: theme.spacing.unit * 8,
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(250 + theme.spacing.unit * 3 * 2)]: {
        width: 250,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
  
    headName:{
      margin: theme.spacing.unit,
    }
  
});

class SettingTemperature extends Component {
    state = {
        greenHouseId: 789456123,
        minTemperature: this.props.minConfig,
        maxTemperature: this.props.maxConfig,
        canSubmit: false
    };

    form = React.createRef();

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    render() {
        const { classes,onSubmit } = this.props
        const {canSubmit} = this.state;

        return (
            <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Typography variant="headline">ตั้งค่าอุณหภูมิที่เหมาะสม</Typography><br/>
                <Formsy
                    onValidSubmit={onSubmit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    ref={(form) => this.form = form}
                    className="flex flex-col justify-center w-full"
                >
                    <TextFieldFormsy
                        className="mb-16"
                        type="number"
                        name="minTemperature"
                        label="อุณหภูมิต่ำสุด"
                        value={this.state.minTemperature}
                        // validations={{
                        //     minLength: 1                          
                        // }}
                        // validationErrors={{
                        //     minLength: 'กรุณากรอกอุณหภูมิสูงสุด'
                        // }}
                        // InputProps={{
                        //     endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">maximize</Icon></InputAdornment>
                        // }}
                        variant="outlined"
                        required
                    />

                    <TextFieldFormsy
                        className="mb-16"
                        type="number"
                        name="maxTemperature"
                        label="อุณหภูมิสูงสุด"
                        value={this.state.maxTemperature}
                        // validations={{
                        //     minLength: 1                          
                        // }}
                        // validationErrors={{
                        //     minLength: 'กรุณากรอกอุณหภูมิสูงสุด'
                        // }}
                        // InputProps={{
                        //     endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">minimize</Icon></InputAdornment>
                        // }}
                        variant="outlined"
                        required
                    />
                    
                    <TextFieldFormsy
                        type="hidden"
                        name="greenHouseId"
                        value={this.state.greenHouseId}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="w-full mx-auto mt-16 normal-case"
                        aria-label="บันทึก"
                        disabled={!canSubmit}
                        value="legacy"
                    >
                        บันทึก
                    </Button>

                </Formsy>                
            </main>
          </React.Fragment>
        )
    }
}


function validate(values) {
    const errors = {};
    let min = parseFloat(values.minTemperature)
    let max = parseFloat(values.maxTemperature)

    if (values.minTemperature === "") {
        errors.minTemperature = 'ต้องกรอกอุณหภูมิต่ำสุด';
    }else if(min < 0 || min > 60 ){
        errors.minTemperature = 'อุณหภูมิต้องอยู่ระหว่าง 0 - 60ํ  ํC ';
    }
    if (values.maxTemperature === "") {
        errors.maxTemperature = 'ต้องกรอกอุณหภูมิสูงสุด';
    }else if(max < 0 || max > 60 ){
        errors.maxTemperature = 'อุณหภูมิต้องอยู่ระหว่าง 0 - 60ํ  ํC ';
    }
    if(min > max ){
        errors.minTemperature = 'อุณหภูมิต่ำสุดต้องน้อยกว่าสูงสุด';
    }
    return errors;
}


export default  withStyles(styles, {withTheme: true})(SettingTemperature);
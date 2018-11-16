import React, { Component } from 'react';
import Formsy from 'formsy-react';
import {TextFieldFormsy} from '@fuse';
import {withStyles} from '@material-ui/core/styles/index';
import {Button, Typography, CssBaseline, Icon, InputAdornment} from '@material-ui/core';

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

// Formsy.addValidationRule('temperatureSetting', (values, value) => {
//     value = parseFloat(value)
//     if(value < 0 || value > 60 ){
//         return false;
//     }
//     return true;
// });

class SettingTemperature extends Component {
    state = {
        greenHouseId: this.props.greenHouseId,
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
                        // validations="temperatureSetting"
                        // validationError="อุณหภูมิต้องอยู่ระหว่าง 0 - 60ํ  ํC"
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

export default  withStyles(styles, {withTheme: true})(SettingTemperature);
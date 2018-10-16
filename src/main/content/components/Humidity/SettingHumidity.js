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

class SettingHumidity extends Component {

    state = {
        greenHouseId: 789456123,
        minHumidity: this.props.minConfig,
        maxHumidity: this.props.maxConfig,
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
                <Typography variant="headline">ตั้งค่าความชื้นที่เหมาะสม</Typography>
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
                        name="minHumidity"
                        label="ความชื้นต่ำสุด"
                        value={this.state.minHumidity}
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
                        name="maxHumidity"
                        label="ความชื้นสูงสุด"
                        value={this.state.maxHumidity}
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


// function validate(values) {
//     const errors = {};
//     let min = parseFloat(values.minHumidity)
//     let max = parseFloat(values.maxHumidity)

//     if (values.minHumidity === "") {
//         errors.minHumidity = 'ต้องกรอกความชื้นต่ำสุด';
//     }else if(min < 0 || min > 100 ){
//         errors.minHumidity = 'ความชื้นต้องอยู่ระหว่าง 0 - 100 ';
//     }
//     if (values.maxHumidity === "") {
//         errors.maxHumidity = 'ต้องกรอกความชื้นสูงสุด';
//     }else if(max < 0 || max > 100 ){
//         errors.maxHumidity = 'ความชื้นต้องอยู่ระหว่าง 0 - 100 ';
//     }
//     if(min > max ){
//         errors.minHumidity = 'ความชื้นต่ำสุดต้องน้อยกว่าสูงสุด';
//     }
//     return errors;
// }


export default withStyles(styles)(SettingHumidity);
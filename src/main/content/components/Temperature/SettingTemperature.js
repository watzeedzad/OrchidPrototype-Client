import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { saveTempConfig } from '../../../../store/actions/application/weatherActions'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import MaterialRenderTextField from '../../../Utils/MaterialRenderTextField';

const styles = theme => ({
    layout: {
      width: 'auto',
      display: 'block', // Fix IE11 issue.
      marginTop: theme.spacing.unit * 8,
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 300,
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

    componentDidMount() {
        //เรียกใช้ฟังก์ชันในการก�ำหนด value ให้กับ textbox และ control ต่างๆ
        this.handleInitialize()
    }

    handleInitialize() {
        let initData = {
            "greenHouseId": 789456123,
            "minTemperature": this.props.minConfig,
            "maxTemperature": this.props.maxConfig,
        };
        this.props.initialize(initData);
    }

    render() {
        const { classes,handleSubmit } = this.props

        return (
            <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Typography variant="title">ตั้งค่าอุณหภูมิที่เหมาะสม</Typography>
                <form className={classes.form}>
                  <FormControl margin="normal" required fullWidth>
                    <Field name="minTemperature"  component={MaterialRenderTextField} type='number' label="อุณหภูมิต่ำสุด" />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                  <Field name="maxTemperature" component={MaterialRenderTextField} type="number" label="อุณหภูมิสูงสุด" />
                  </FormControl>
                  <Button
                    type="submit"
                    fullWidth
                    variant="raised"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit(this.onSubmit)}
                  >
                    บันทึก
                  </Button>
                </form>
            </main>
          </React.Fragment>
        )
    }


    onSubmit = (values) => {
        //เมื่อบันทึกข้อมูลเสร็จสังให้ไปยัง route /
        this.props.dispatch(saveTempConfig(values)).then(() => {
            this.props.onToggle()
        })
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

const form = reduxForm({
    form: 'settingTemp',
    validate
})

export default withStyles(styles)(form(SettingTemperature));
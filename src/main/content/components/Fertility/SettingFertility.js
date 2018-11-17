import React, { Component } from 'react';
import Formsy, { addValidationRule }from 'formsy-react';
import {TextFieldFormsy} from '@fuse';
import {withStyles} from '@material-ui/core/styles/index';
import {Button, Typography, CssBaseline} from '@material-ui/core';
import {connect} from 'react-redux';

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

addValidationRule('fertilitySetting', (values, value) => {
    value = parseFloat(value)
    if(value < 0 || value > 100 ){
        return false;
    }
    return true;
});

class SettingFertility extends Component {
    state = {
        projectId: this.props.projectId,
        minFertility: this.props.minConfig,
        maxFertility: this.props.maxConfig,
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
        const { classes,onSubmit,auth } = this.props
        const {canSubmit} = this.state;

        return (
            <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Typography variant="headline">ตั้งค่าปริมาณแร่ธาตุที่เหมาะสม</Typography><br/>
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
                        name="minFertility"
                        label="ปริมาณแร่ธาตุต่ำสุด"
                        value={this.state.minFertility}
                        validations="fertilitySetting"
                        validationError="ปริมาณแร่ธาตุอยู่ระหว่าง 0 - 100"
                        variant="outlined"
                        disabled = {auth.data.user.role==='พนักงาน'?true:false}
                        required
                    />

                    <TextFieldFormsy
                        className="mb-16"
                        type="number"
                        name="maxFertility"
                        label="ปริมาณแร่ธาตุสูงสุด"
                        value={this.state.maxFertility}
                        validations="fertilitySetting"
                        validationError="ปริมาณแร่ธาตุอยู่ระหว่าง 0 - 100"
                        variant="outlined"
                        disabled = {auth.data.user.role==='พนักงาน'?true:false}
                        required
                    />
                    
                    <TextFieldFormsy
                        type="hidden"
                        name="projectId"
                        value={this.state.projectId}
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

function mapStateToProps({application})
{
    return {
        auth       : application.loginReducers.auth
    }
}


export default withStyles(styles, {withTheme: true})(connect(mapStateToProps)(SettingFertility));
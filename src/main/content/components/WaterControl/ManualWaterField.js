import React, { Component } from 'react';
import Formsy from 'formsy-react';
import {TextFieldFormsy} from '@fuse';
import {withStyles} from '@material-ui/core/styles/index';
import {Button, Typography, CssBaseline} from '@material-ui/core';

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

class ManualWaterField extends Component {

    state = {
        greenHouseId: 789456123,
        litre: 0,
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
                <Typography variant="headline">กรอกปริมาณน้ำที่ต้องการให้</Typography>

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
                        name="litre"
                        label="ปริมาณน้ำที่จะให้(ลิตร)"
                        value={this.state.litre}
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
                        fullWidth
                        required
                    />

                    <TextFieldFormsy
                        type="hidden"
                        name="greenHouseId"
                        value={this.state.greenHouseId}
                    />

                    <Button
                        type="submit"
                        variant="raised"
                        color="primary"
                        className="w-full mx-auto mt-16 normal-case"
                        aria-label="บันทึก"
                        disabled={!canSubmit}
                        value="legacy"
                    >
                        ให้น้ำทันที
                    </Button>
                </Formsy>  
            </main>
          </React.Fragment>
        )
    }


    
}


function validate(values) {
    const errors = {};
    let litre = parseFloat(values.litre)

    if (values.litre === "") {
        errors.litre = 'กรุณากรอกน้ำที่ต้องการให้';
    }else if(litre < 0){
        errors.litre = 'ปริมาณน้ำไม่สามารถติดลบได้';
    }else if(litre == 0){
        errors.litre = 'ปริมาณน้ำต้องมากกว่าศูนย์'
    }
    return errors;
}

export default withStyles(styles, {withTheme: true})(ManualWaterField);
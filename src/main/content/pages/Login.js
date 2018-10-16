import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import {Link, withRouter} from 'react-router-dom';
import {Button, Card, CardContent, Checkbox, Divider, FormControl, FormControlLabel, TextField, Typography} from '@material-ui/core';
import classNames from 'classnames';
import { Field,reduxForm } from 'redux-form';
import _ from '@lodash';
import {FuseAnimate} from '@fuse';
import { login } from '../../../store/actions/application/loginActions'; 
import MaterialRenderTextField from '../../../main/Utils/MaterialRenderTextField'

const styles = theme => ({
    root: {
        background    : "url('/assets/images/backgrounds/dark-material-bg.jpg') no-repeat",
        backgroundSize: 'cover'
    },
    card: {
        width   : '100%',
        maxWidth: 384
    }
});

class Login extends Component {
    state = {
        username   : '',
        password: '',
        remember: true
    };

    componentDidMount() {
        //เรียกใช้ฟังก์ชันในการก�ำหนด value ให้กับ textbox และ control ต่างๆ
        this.handleInitialize()
    }

    handleInitialize() {
        let initData = {
            "username": this.state.username,
            "password": this.state.password,
        };
        this.props.initialize(initData);
    };

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    canBeSubmitted()
    {
        const {username, password} = this.state;
        return (
            username.length > 0 && password.length > 0
        );
    }

    render()
    {
        const {classes,handleSubmit} = this.props;
        const {remember} = this.state;

        return (
            <div className={classNames(classes.root, "flex flex-col flex-auto flex-no-shrink items-center justify-center p-32")}>

                <div className="flex flex-col items-center justify-center w-full">

                    <FuseAnimate animation="transition.expandIn">

                        <Card className={classes.card}>

                            <CardContent className="flex flex-col items-center justify-center p-32">

                                <img className="w-128 m-32" src="assets/images/logos/fuse.svg" alt="logo"/>

                                <Typography variant="h6" className="mt-16 mb-32">LOGIN TO YOUR ACCOUNT</Typography>

                                <form className="flex flex-col justify-center w-full">

                                    <Field
                                        component={MaterialRenderTextField}
                                        className="mb-16"
                                        label="Username"
                                        autoFocus
                                        type="text"
                                        name="username"
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        required
                                        fullWidth
                                    />

                                    <Field
                                        component={MaterialRenderTextField}
                                        className="mb-16"
                                        label="Password"
                                        type="password"
                                        name="password"
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        required
                                        fullWidth
                                    />

                                    <div className="flex items-center justify-between">

                                        <FormControl>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="remember"
                                                        checked={remember}
                                                        onChange={this.handleChange}/>
                                                }
                                                label="Remember Me"
                                            />
                                        </FormControl>

                                        <Link className="font-medium" to="/pages/auth/forgot-password">
                                            Forgot Password?
                                        </Link>
                                    </div>

                                    <Button variant="contained" color="primary" className="w-224 mx-auto mt-16" aria-label="LOG IN"
                                            disabled={!this.canBeSubmitted()} onClick={handleSubmit(this.onSubmit)}>
                                        LOGIN
                                    </Button>

                                </form>

                            </CardContent>
                        </Card>
                    </FuseAnimate>
                </div>
            </div>
        );
    }

    onSubmit = (values) => {
        //เมื่อบันทึกข้อมูลเสร็จสังให้ไปยัง route /
        console.log(values)
        this.props.dispatch(login({username:'test01',password:'test01'}))
    }
}

const form = reduxForm({
    form: 'login',
})

export default withStyles(styles, {withTheme: true})(form(withRouter(Login)));

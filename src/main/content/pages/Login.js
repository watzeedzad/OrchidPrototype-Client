import React, {Component} from 'react';
import Formsy from 'formsy-react';
import {TextFieldFormsy} from '@fuse';
import {withStyles} from '@material-ui/core/styles/index';
import {withRouter} from 'react-router-dom';
import {Button, Card, CardContent, Typography, Icon, InputAdornment} from '@material-ui/core';
import classNames from 'classnames';
import _ from '@lodash';
import {FuseAnimate} from '@fuse';
import connect from 'react-redux/es/connect/connect';
import { login } from 'store/actions/application/loginActions';
import { setSettings } from 'store/actions/fuse/settings.actions'
import {LoginConfig} from './LoginConfig'

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
        canSubmit: false
    };

    componentDidMount() {
        this.props.dispatch(setSettings(LoginConfig.settings))
    }

    form = React.createRef();

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    componentDidUpdate(prevProps, prevState)
    {
        if ( this.props.login.error && (this.props.login.error.username || this.props.login.error.password) )
        {
            this.form.updateInputsWithError({
                ...this.props.login.error
            });

            this.props.login.error = null;
            this.disableButton();
        }

        // if ( this.props.user.role !== 'guest' )
        // {
        //     const pathname = this.props.location.state && this.props.location.state.redirectUrl ? this.props.location.state.redirectUrl : '/';
        //     this.props.history.push({
        //         pathname
        //     });
        // }
        return null;
    }

    render()
    {
        const {classes} = this.props;
        const {canSubmit} = this.state;

        return (
            <div className={classNames(classes.root, "flex flex-col flex-auto flex-no-shrink items-center justify-center p-32")}>

                <div className="flex flex-col items-center justify-center w-full">

                    <FuseAnimate animation="transition.expandIn">

                        <Card className={classes.card}>

                            <CardContent className="flex flex-col items-center justify-center p-32">

                                <img className="w-272 m-32" src="assets/images/logos/smart-farm.png" alt="logo"/>
                                <Formsy
                                    onValidSubmit={this.onSubmit}
                                    onValid={this.enableButton}
                                    onInvalid={this.disableButton}
                                    ref={(form) => this.form = form}
                                    className="flex flex-col justify-center w-full"
                                >
                                    <TextFieldFormsy
                                        className="mb-16"
                                        type="text"
                                        name="username"
                                        label="Username"
                                        validations={{
                                            minLength: 4
                                        }}
                                        validationErrors={{
                                            minLength: 'Min character length is 4'
                                        }}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                                        }}
                                        variant="outlined"
                                        required
                                    />

                                    <TextFieldFormsy
                                        className="mb-16"
                                        type="password"
                                        name="password"
                                        label="Password"
                                        validations={{
                                            minLength: 4
                                        }}
                                        validationErrors={{
                                            minLength: 'Min character length is 4'
                                        }}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                                        }}
                                        variant="outlined"
                                        required
                                    />

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className="w-full mx-auto mt-16 normal-case"
                                        aria-label="LOG IN"
                                        disabled={!canSubmit}
                                        value="legacy"
                                    >
                                        Login
                                    </Button>

                                </Formsy>

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
        this.props.dispatch(login(values))
    }
}

function mapStateToProps({application})
{
    return {
        login: application.loginReducers
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps)(Login)));

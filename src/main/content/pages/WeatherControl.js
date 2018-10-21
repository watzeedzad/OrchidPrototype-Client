import React, { Component } from 'react'
import TemperatureTab from '../components/Temperature/TemperatureTab';
// import HumidityTab from '../components/Humidity/HumidityTab'
import { withStyles } from '@material-ui/core/styles';
import {FuseAnimate,FusePageCarded} from '@fuse';
import {Icon, Typography} from '@material-ui/core';

const styles = theme => ({
    root: {
        width: '100%'
    },
    layoutRoot: {}
});
    

class WeatherControl extends Component {

    render()
    {
    const { classes } = this.props;
        return (
            <FusePageCarded
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <div className="flex items-center">
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Icon className="text-32 mr-12">wb_sunny</Icon>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography variant="h6" className="hidden sm:flex">ควบคุมสภาพอากาศ</Typography>
                        </FuseAnimate>
                    </div>
                }
                content={
                    <FuseAnimate animation="transition.slideUpIn" delay={200}>
                        <div>
                            <TemperatureTab /><br/><hr/>
                            {/* <HumidityTab /><br/> */}
                        </div>
                    </FuseAnimate>
                }
            />

        )
    }
}

export default withStyles(styles, { withTheme: true }) (WeatherControl);
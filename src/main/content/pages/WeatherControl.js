import React, { Component } from 'react'
import TemperatureTab from '../components/Temperature/TemperatureTab';
import HumidityTab from '../components/Humidity/HumidityTab'
import { withStyles } from '@material-ui/core/styles';
import {FuseAnimate} from '@fuse';

const styles = theme => ({
    root: {
        width: '100%'
    },
});
    

function WeatherControl(props){
    const { classes } = props;
        return (
            <div className={classes.root}>
                <FuseAnimate animation="transition.slideUpIn" delay={200}>
                    <div>
                        <TemperatureTab /><br/><hr/>
                        <HumidityTab />
                    </div>
                </FuseAnimate>
            </div>
        )
    }


export default withStyles(styles, { withTheme: true }) (WeatherControl);
import React, { Component } from 'react'
import TemperatureTab from '../components/Temperature/TemperatureTab';
import HumidityTab from '../components/Humidity/HumidityTab'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
      flexGrow: 1,
      zIndex: 1,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
      },
      toolbar: theme.mixins.toolbar,
    });
    

function WeatherControl(props){
    const { classes } = props;
        return (
            <div className={classes.root}>
                <main className={classes.content}>
                <div className={classes.toolbar} />
                <TemperatureTab /><br/><hr/>
                <HumidityTab />
                </main>
            </div>
        )
    }


export default withStyles(styles, { withTheme: true }) (WeatherControl);
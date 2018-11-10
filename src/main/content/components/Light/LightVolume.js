import React, { Component } from 'react';
import { getLightVolume, saveLightVolume } from 'store/actions/application/lightActions'
import { connect } from 'react-redux'
import LightVolumeGauge from './LightVolumeGauge'
import SettingLightVolume from './SettingLightVolume'
import {Typography, SnackbarContent, Grid, Paper, CssBaseline} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { setNavigation } from 'store/actions/fuse/navigation.actions'
import { greenHouseNavigation } from 'fuse-configs/fuseNavigationConfig';

const styles = theme => ({
    layout: {
      width: 'auto',
      display: 'block', // Fix IE11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(1200 + theme.spacing.unit * 3 * 2)]: {
        width: 1200,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginBottom: theme.spacing.unit * 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    gauge:{
      margin: theme.spacing.unit*3,
    }
  
});

class LightVolume extends Component {

    constructor() {
        super();
    
        this.state = {
            intervalId : null,
        };
    }

    componentDidMount() {
        this.props.dispatch(setNavigation(greenHouseNavigation))
        this.fetchData(0)
        var intervalId = setInterval( this.fetchData, 15000);
        this.setState({intervalId: intervalId});
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.volume.data !== null && nextProps.volume.data !== null){
            return this.props.volume.data.currentLightVolume !== nextProps.volume.data.currentLightVolume
        }else{
            return true
        }
    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    }
    
    fetchData = (count) => {
        if(!this.props.greenHouse.isLoading){
        this.props.dispatch(getLightVolume({ greenHouseId: this.props.greenHouse.data.greenHouseId,count:count }))
        }
    }

    render() {
        const { classes,volume,greenHouse } = this.props
        const { data } = volume

        if (volume.isRejected) {
            return <SnackbarContent className="bg-red-light" message={"Error: "+volume.data}/>
        }
        if (volume.isLoading || greenHouse.isLoading) {
            return <Typography variant="body1">Loading...</Typography>
        }
        if (data.errorMessage){
            return  <Paper className={classes.paper}>
                        <SnackbarContent className="bg-red-light" message={data.errorMessage}/>
                    </Paper>
        }
        
        let currentVolume = this.msToTime(data.currentLightVolume)
        let maxVolume= this.msToTime(data.maxLightVolume)

        let currentProgress = Math.floor((data.currentLightVolume/data.maxLightVolume)*100)
        return (
            <React.Fragment>
            <CssBaseline />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={12} md={6}>
                                <div className={classes.gauge}>
                                <Typography variant="headline">
                                    ปริมาณแสงที่ได้รับ {currentVolume} / {maxVolume}
                                </Typography>
                                <LightVolumeGauge
                                    currentProgress={currentProgress}
                                />
                                </div>
                            </Grid> 
                            <Grid item xs={12} sm={12} md={6}>
                                <SettingLightVolume
                                    maxConfig={data.maxLightVolume}
                                    onSubmit={this.onSubmit}
                                />
                            </Grid>
                        </Grid> 
                    </Paper>
                </main>
            </React.Fragment>
        )
    }

    onSubmit = (values) => {
        //เมื่อบันทึกข้อมูลเสร็จสังให้ไปยัง route /
        this.props.dispatch(saveLightVolume(values)).then(() => {
            this.fetchData(0)
        })
    }

    msToTime = (duration) => {
        var minutes = parseInt((duration / (1000 * 60)) % 60),
          hours = parseInt((duration / (1000 * 60 * 60)) % 24);
      
        return hours + " ชม. " + minutes + " นาที" ;
      }

}

function mapStateToProps({application}) {
    return {
        volume: application.lightReducers.volume,
        greenHouse: application.greenHouseReducers.greenHouse,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(LightVolume))
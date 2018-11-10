import React, { Component } from 'react';
import { getLightIntensity, saveLightIntensity } from 'store/actions/application/lightActions'
import { connect } from 'react-redux'
import LightIntensityGauge from './LightIntensityGauge'
import SettingLightIntensity from './SettingLightIntensity'
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
      marginTop: theme.spacing.unit * 4,
      marginBottom: theme.spacing.unit * 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    headName:{
      margin: theme.spacing.unit,
    }
  
});

class LightIntensity extends Component {

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
        if(this.props.intensity.data !== null && nextProps.intensity.data !== null){
            return this.props.intensity.data.currentLightIntensity !== nextProps.intensity.data.currentLightIntensity
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
            this.props.dispatch(getLightIntensity({ greenHouseId: this.props.greenHouse.data.greenHouseId , count: count }))
        }
    }

    render() {
        const { classes,intensity,greenHouse } = this.props
        const { data } = intensity

        if (intensity.isRejected) {
            return <SnackbarContent className="bg-red-light" message={"Error: "+intensity.data}/>
        }
        if (intensity.isLoading || greenHouse.isLoading) {
            return <Typography variant="body1">Loading...</Typography>
        }
        if (data.errorMessage){
            return  <Paper className={classes.paper}>
                        <SnackbarContent className="bg-red-light" message={data.errorMessage}/>
                    </Paper>
        }
    
        return (
            <React.Fragment>
            <CssBaseline />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={12} md={6}>
                                <LightIntensityGauge
                                    minConfig={data.minLightIntensity}
                                    maxConfig={data.maxLightIntensity}
                                    currentValue={data.currentLightIntensity}
                                />
                            </Grid> 
                            <Grid item xs={12} sm={12} md={6}>
                                <SettingLightIntensity
                                    minConfig={data.minLightIntensity}
                                    maxConfig={data.maxLightIntensity}
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
        this.props.dispatch(saveLightIntensity(values)).then(() => {
            this.fetchData(0)
        })
    }
}

function mapStateToProps({application}) {
    return {
        intensity: application.lightReducers.intensity,
        greenHouse: application.greenHouseReducers.greenHouse,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(LightIntensity))
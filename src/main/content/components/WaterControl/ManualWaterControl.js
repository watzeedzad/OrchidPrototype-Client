import React, { Component } from 'react';
import { getMoisture } from 'store/actions/application/planterActions'
import { manaulWatering } from 'store/actions/application/waterActions'
import { connect } from 'react-redux'
import MoistureGauge from '../Moisture/MoistureGauge'
import ManualWaterField from '../WaterControl/ManualWaterField'
import {Grid, CssBaseline, Typography, SnackbarContent, Paper} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

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
  
});

class ManualWaterControl extends Component {

    
    constructor() {
        super();
    
        this.state = {
            intervalId : null,
        };
    }

    componentDidMount() {
        this.fetchData(0)
        var intervalId = setInterval( this.fetchData, 15000);
        this.setState({intervalId: intervalId});
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.moisture.data !== null && nextProps.moisture.data !== null){
            return this.props.moisture.data.currentSoilMoisture !== nextProps.moisture.currentSoilMoisture
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
            this.props.dispatch(getMoisture({ greenHouseId: this.props.greenHouse.data.greenHouseId ,count:count}))
        }
    }

    render() {
        const { classes,moisture,greenHouse } = this.props
        const { data } = moisture

        if (moisture.isRejected) {
            return <SnackbarContent className="bg-red-light" message={"Error: "+moisture.data}/>
        }
        if (moisture.isLoading || greenHouse.isLoading) {
            return <Typography variant="body1">Loading...</Typography>
        }
        if (data.errorMessage){
            return <SnackbarContent className="bg-red-light" message={data.errorMessage}/>
        }
    
        return (
            <React.Fragment>
            <CssBaseline />
                <div className="pl-60">
                    <Typography variant="headline">สั่งให้น้ำแบบทันที</Typography>
                </div>
                <main className={classes.layout}>                
                    <Paper className={classes.paper}>
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={12} md={6}>
                                <MoistureGauge
                                    minConfig={data.minConfigSoilMoisture}
                                    maxConfig={data.maxConfigSoilMoisture}
                                    currentValue={data.currentSoilMoisture}
                                />
                            </Grid> 
                            <Grid item xs={12} sm={12} md={6}>
                                <ManualWaterField
                                    greenHouseId={greenHouse.data.greenHouseId}
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
        this.props.dispatch(manaulWatering(values)).then(() => {
            this.fetchData(0)
        })
    }
}

function mapStateToProps({application}) {
    return {
        moisture: application.planterReducers.moisture,
        greenHouse: application.greenHouseReducers.greenHouse,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(ManualWaterControl));
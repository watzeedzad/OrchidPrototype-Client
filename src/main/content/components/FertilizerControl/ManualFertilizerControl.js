import React, { Component } from 'react';
import { getFertility } from 'store/actions/application/planterActions'
import { manaulFertilizer } from 'store/actions/application/fertilizerActions'
import { connect } from 'react-redux'
import FertilityGauge from '../Fertility/FertilityGauge'
import ManualFertilizerField from '../FertilizerControl/ManualFertilizerField'
import {Grid, CssBaseline, Typography, SnackbarContent, Paper} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { setNavigation } from 'store/actions/fuse/navigation.actions'
import { projectNavigation } from 'fuse-configs/fuseNavigationConfig';

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


class ManualFertilizerControl extends Component {

    
    constructor() {
        super();
    
        this.state = {
            intervalId : null,
        };
    }

    componentDidMount() {
        this.props.dispatch(setNavigation(projectNavigation))
        this.fetchData(0)
        var intervalId = setInterval( this.fetchData, 15000);
        this.setState({intervalId: intervalId});
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.fertility.data !== null && nextProps.fertility.data !== null){
            return this.props.fertility.data.currentFertility !== nextProps.fertility.data.currentFertility
        }else{
            return true
        }
    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    }
    
    fetchData = (count) => {
        this.props.dispatch(getFertility({ projectId: this.props.projectId , count:count}))
    }

    render() {
        const { classes,fertility } = this.props
        const { data } = fertility

        if (fertility.isRejected) {
            return <SnackbarContent className="bg-red-light" message={"Error: "+fertility.data}/>
        }
        if (fertility.isLoading) {
            return <Typography variant="body1">Loading...</Typography>
        }
        if (data.errorMessage){
            return <SnackbarContent className="bg-red-light" message={data.errorMessage}/>
        }
        return (
            <React.Fragment>
            <CssBaseline />
                <div className="pl-60">
                    <Typography variant="headline">สั่งให้ปุ๋ยแบบทันที</Typography>
                </div>
                <main className={classes.layout}>                
                    <Paper className={classes.paper}>
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={12} md={6}>
                            <FertilityGauge
                                minConfig={data.minConfigFertility}
                                maxConfig={data.maxConfigFertility}
                                currentValue={data.currentFertility}
                            />
                        </Grid> 
                        <Grid item xs={12} sm={12} md={6}>
                            <ManualFertilizerField
                                projectId={this.props.projectId}
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
        this.props.dispatch(manaulFertilizer(values)).then(() => {
            this.fetchData(0)
        })
    }
}

function mapStateToProps({application}) {
    return {
        fertility: application.planterReducers.fertility,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(ManualFertilizerControl));
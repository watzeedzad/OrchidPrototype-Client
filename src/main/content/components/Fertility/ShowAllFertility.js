import React, { Component } from 'react';
import { getAllFertility, getFertility } from 'store/actions/application/planterActions'
import { connect } from 'react-redux'
import Speedometer from '../../../Utils/Speedometer'
import Button from '@material-ui/core/Button';
import history from '../../../../history'
import { debounce } from 'lodash'
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import {Typography} from '@material-ui/core';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Grid from '@material-ui/core/Grid';

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
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    headName:{
      margin: theme.spacing.unit,
    },
  
});

class ShowAllFertility extends Component {
 
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

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    }
    
    fetchData = (count) => {
        this.props.dispatch(getAllFertility({ greenHouseId: 789456123 ,count:count}))
    }

    render() {
        const { classes,fertilitys } = this.props
        const { data } = fertilitys

        if (fertilitys.isRejected) {
            return <SnackbarContent className="bg-red-light" message={"Error: "+fertilitys.data}/>
        }
        if (fertilitys.isLoading) {
            return <Typography variant="body1">Loading...</Typography>
        }
        if (data.errorMessage){
            return <SnackbarContent className="bg-red-light" message={data.errorMessage}/>
        }

        return (
            <React.Fragment>
            <CssBaseline />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={24}>
                            {data.allFertility && data.allFertility.map(e => {
                                let projectId = e.projectId
                                return (
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Typography variant="subtitle1">รหัสโปรเจ็ค : {e.projectId}</Typography>
                                        <Speedometer
                                            title={"ปริมาณแร่ธาตุ ณ ปัจจุบัน"}
                                            min={0}
                                            max={100}
                                            minConfig={e.minFertility}
                                            maxConfig={e.maxFertility}
                                            currentValue={e.currentFertility}
                                            minColor={"#E8B79E"}
                                            midColor={"#D98559"}
                                            maxColor={"#BE5C2A"} />
                                        <Button color="primary"
                                            variant="raised"
                                            fullWidth
                                            onClick={debounce(() => 
                                                { this.props.dispatch(getFertility({ projectId:projectId,count:0 })).then(()=>{
                                                    history.push('/fertilityControl')
                                                }) },500)}>
                                            ตั้งค่า
                                        </Button>
                                        <br /><hr />
                                    </Grid>
                                )
                            })}
                            
                        </Grid> 
                    </Paper>
                </main>
            </React.Fragment>
        )
    }

}

function mapStateToProps({application}) {
    return {
        fertilitys: application.planterReducers.fertilitys,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(ShowAllFertility));
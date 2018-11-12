import React, { Component } from 'react';
import Temperature from './Temperature'
import TemperatureGraph from './TemperatureGraph'
import {Typography, SnackbarContent, withStyles, Paper, CssBaseline} from '@material-ui/core';
import { connect } from 'react-redux'


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
    }
  
});

class TemperatureTab extends Component {
    render() {

        const { classes,greenHouse } = this.props;
        const { data } = greenHouse

        if (greenHouse.isRejected) {
            return <SnackbarContent className="bg-red-light" message={"Error: "+greenHouse.data}/>
        }
        if (greenHouse.isLoading) {
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
                        <div className="w-full">
                            <Temperature greenHouseId={data.greenHouseId}/>
                        </div>
                        <div className="w-full">
                            <TemperatureGraph greenHouseId={data.greenHouseId}/>
                        </div>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

function mapStateToProps({application}) {
    return {
        greenHouse: application.greenHouseReducers.greenHouse,
    }
}

export default  withStyles(styles, {withTheme: true})(connect(mapStateToProps)(TemperatureTab));
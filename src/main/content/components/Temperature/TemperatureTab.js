import React, { Component } from 'react';
import Temperature from './Temperature'
import TemperatureGraph from './TemperatureGraph'
import { Container, Row, Col } from 'reactstrap';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
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

        const { classes } = this.props;

        return (
            <React.Fragment>
            <CssBaseline />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <div className="w-full">
                            <Temperature />
                        </div>
                        <div className="w-full">
                            <TemperatureGraph />
                        </div>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

export default  withStyles(styles, {withTheme: true})(TemperatureTab);
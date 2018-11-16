import React, {Component} from 'react';
import {withStyles,Typography,SnackbarContent,Paper} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {FuseAnimate} from '@fuse';
import ReactTable from "react-table";
import classNames from 'classnames';
import { showFertilizerHistory } from 'store/actions/application/fertilizerActions'
import { connect } from 'react-redux'

const styles = theme => ({

    layout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.
        marginTop: theme.spacing.unit * 4,
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
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
      },

});

class FertilizerHistory extends Component {

    componentDidMount() {
        this.props.dispatch(showFertilizerHistory({ projectId: this.props.projectId }))
    }

    render()
    {
        const {classes, fertilizerHistory} = this.props;
        const {data} = fertilizerHistory

        if (fertilizerHistory.isRejected) {
            return <SnackbarContent className="bg-red-light" message={"Error: "+fertilizerHistory.data}/>
        }
        if (fertilizerHistory.isLoading) {
            return <Typography variant="body1">Loading...</Typography>
        }
        
        return (
            <div>
                <div className="pl-60">
                        <Typography variant="headline">ประวัติการให้ปุ๋ย</Typography>
                </div>
                <main className={classes.layout}>                
                    <Paper className={classes.paper}>
                        <FuseAnimate animation="transition.slideUpIn" delay={300}>
                            <ReactTable
                                className={classNames(classes.root, "-striped -highlight border-0")}
                                data={data.history}
                                columns={[
                                    {
                                        Header    : "รหัสโรงเรือน",
                                        Cell  : row => (<div>{data.greenHouseId}</div>),
                                        filterable: true,
                                        className : "font-bold"
                                    },
                                    {
                                        Header    : "รหัสโปรเจ็ค",
                                        Cell  : row => (<div>{data.projectId}</div>),
                                        filterable: true,
                                        className : "font-bold"
                                    },
                                    {
                                        id        : 'startTime',
                                        Header    : "วันที่",
                                        accessor  : d => d.startTime.slice(0,19).replace('T',' '),
                                        filterable: true,
                                    },
                                    {
                                        Header    : "สูตรปุ๋ย",
                                        accessor  : "ratio",
                                        filterable: true,
                                    },
                                    {   
                                        id        : 'volume',
                                        Header    : "ปริมาณ(ลิตร)",
                                        accessor  : d => d.volume/1000,
                                        filterable: true,
                                    },
                                ]}
                                defaultPageSize={10}
                                noDataText="ไม่มีประวัติการให้ปุ๋ย"
                            />
                        </FuseAnimate>
                    </Paper>
                </main>
            </div>
        );
    }
}

function mapStateToProps({application}) {
    return {
        fertilizerHistory: application.fertilizerReducers.fertilizerHistory,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps)(withRouter(FertilizerHistory)));

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from 'reactstrap';
import { getGreenHouseController } from 'store/actions/application/controllerActions'


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class GreenHouseControllerList extends Component {

    componentDidMount() {
        this.props.dispatch(getGreenHouseController({ 
            greenHouseId: this.props.greenHouseId 
        }))
    }

    render() {
        const { classes,gController,buttonDelete,buttonEdit,buttonCreate } = this.props;

        if (gController.isRejected) {
            return <div className="alert alert-danger">Error: {gController.data}</div>
        }
        if (gController.isLoading) {
            return <div>Loading...</div>
        }
        
        return (
                <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>Controller Name</CustomTableCell>
                            <CustomTableCell >GreenHouseId</CustomTableCell>
                            <CustomTableCell >IP</CustomTableCell>
                            <CustomTableCell >Mac Address</CustomTableCell>
                            <CustomTableCell >ปั๊มน้ำ</CustomTableCell>
                            <CustomTableCell >ปั๊มปุ๋ย</CustomTableCell>
                            <CustomTableCell >ปั๊มความชื้น</CustomTableCell>
                            <CustomTableCell >หลอดไฟ</CustomTableCell>
                            <CustomTableCell >
                                <Button color="success" size="sm"
                                    onClick={() => buttonCreate(this.props.greenHouseId,null)}>เพิ่มข้อมูล</Button>
                            </CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gController.data.errorMessage
                        ? <div className="alert alert-danger">{gController.data.errorMessage}</div>
                        : gController.data && gController.data.map(e => {
                        return (
                            <TableRow className={classes.row} key={e.id}>
                                <CustomTableCell component="th" scope="row">{e.name}</CustomTableCell>
                                <CustomTableCell >{e.greenHouseId}</CustomTableCell>
                                <CustomTableCell >{e.ip}</CustomTableCell>
                                <CustomTableCell >{e.mac_address}</CustomTableCell>
                                <CustomTableCell >{e.relayType.water?"มี":"ไม่มี"}</CustomTableCell>
                                <CustomTableCell >{e.relayType.fertilizer?"มี":"ไม่มี"}</CustomTableCell>
                                <CustomTableCell >{e.relayType.moisture?"มี":"ไม่มี"}</CustomTableCell>
                                <CustomTableCell >{e.relayType.light?"มี":"ไม่มี"}</CustomTableCell>
                                <CustomTableCell >
                                    <Button color="secondary" size="sm" onClick={() => buttonEdit(e)}>แก้ไข</Button>{"  "}
                                    <Button color="danger" size="sm" onClick={() => buttonDelete(e.mac_address)}>ลบ</Button> 
                                </CustomTableCell>
                            </TableRow>
                        )})}
                    </TableBody>
                </Table>
                </Paper>
        );
    }

}

function mapStateToProps({application}) {
    return {
        gController: application.controllerReducers.gController,
    }
}

GreenHouseControllerList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(GreenHouseControllerList));
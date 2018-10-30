import React, { Component } from 'react'
import { ModalBody } from 'reactstrap';
import { loadFarmCSV, loadGreenHouseCSV, loadProjectCSV } from 'store/actions/application/monitoringActions'
import { connect } from 'react-redux'
import {CSVLink} from 'react-csv';
import {
    Dialog, DialogContent, Typography, Toolbar, AppBar, withStyles, SnackbarContent
} from '@material-ui/core';

const styles = theme => ({
    root       : {},
    formControl: {
        marginBottom: 24
    }
});

class CSVModal extends Component {

    componentDidMount() {
        const {farmId,greenHouseId,projectId} = this.props
        this.props.dispatch(loadFarmCSV({farmId: farmId})).then(() => {
            this.props.dispatch(loadGreenHouseCSV({farmId: farmId,greenHouseId:greenHouseId})).then(() => {
                this.props.dispatch(loadProjectCSV({farmId: farmId, greenHouseId:greenHouseId, projectId:projectId}))
            })
        })
    }

    render() {
        const { classes,farmCSV,greenHouseCSV,projectCSV,onToggle,isOpen } = this.props

        if (farmCSV.isRejected || greenHouseCSV.isRejected || projectCSV.isRejected) {
            return <SnackbarContent className="bg-red-light" message={"Error: "+farmCSV.data}/>
        }
        if (farmCSV.isLoading || greenHouseCSV.isLoading || projectCSV.isLoading) {
            return <Typography variant="body1">Loading...</Typography>
        }
        if (farmCSV.data.errorMessage || greenHouseCSV.data.errorMessage || projectCSV.data.errorMessage) {
            return (
                <Dialog
                    classes={{
                        root : classes.root,
                        paper: "m-24"
                    }}
                    className={classes.root}
                    onClose={onToggle}
                    open={isOpen}
                    fullWidth
                    maxWidth="xs"
                >
                    <AppBar position="static" elevation={1}>
                        <Toolbar className="flex w-full">
                            <Typography variant="subtitle1" color="inherit">
                                ส่งออกข้อมูลการเจริญเติบโต
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <DialogContent classes={{root: "p-24"}}>
                        <div align="center">
                            {farmCSV.data.errorMessage}
                        </div>
                    </DialogContent>
                </Dialog>
            )
        }
        
        const headers = [
            {label: 'farmId', key: 'farmId'},
            {label: 'greenHouseId', key: 'greenHouseId'},
            {label: 'projectId', key: 'projectId'},
            {label: 'trunkDiameter', key: 'trunkDiameter'},
            {label: 'leafWidth', key: 'leafWidth'},
            {label: 'totalLeaf', key: 'totalLeaf'},
            {label: 'height', key: 'height'},
        ]

        return (
            <Dialog
                classes={{
                    root : classes.root,
                    paper: "m-24"
                }}
                className={classes.root}
                onClose={onToggle}
                open={isOpen}
                fullWidth
                maxWidth="xs"
            >
                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="headline" color="inherit">
                            ส่งออกข้อมูลการเจริญเติบโต
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent classes={{root: "p-24"}}>
                    <div className="flex flex-col">
                        <CSVLink data={farmCSV.data} headers={headers}>
                            <Typography variant="subtitle1">export ข้อมูลของทั้งฟาร์ม</Typography>
                        </CSVLink>
                        <CSVLink data={greenHouseCSV.data} headers={headers}>
                            <Typography variant="subtitle1">export ข้อมูลของทั้งโรงเรือน</Typography>
                        </CSVLink>
                        <CSVLink data={projectCSV.data} headers={headers}>
                            <Typography variant="subtitle1">export ข้อมูลของทั้งโปรเจ็ค</Typography>
                        </CSVLink>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

}

function mapStateToProps({application}) {
    return {
        farmCSV: application.monitoringReducers.farmCSV,
        greenHouseCSV: application.monitoringReducers.greenHouseCSV,
        projectCSV: application.monitoringReducers.projectCSV
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps)(CSVModal));
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { FuseAnimate } from '@fuse';
import { Icon, IconButton, Typography} from '@material-ui/core';
import ReactTable from "react-table";
import classNames from 'classnames';
import { getGreenHouseController } from 'store/actions/application/controllerActions'


const styles = theme => ({
    mailList: {
        padding: 0
    },
    mailItem: {},
    avatar  : {
        backgroundColor: theme.palette.primary[500]
    },
    labels  : {}

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
                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <ReactTable
                    className={classNames(classes.root, "-striped -highlight border-0")}
                    getTrProps={(state, rowInfo, column) => {
                        return {
                            className: "cursor-pointer",
                            onClick  : (e, handleOriginal) => {
                                if ( rowInfo )
                                {
                                    buttonEdit(rowInfo.original);
                                }
                            }
                        }
                    }}
                    data={gController.data}
                    columns={[
                        {
                            Header    : "ชื่อ",
                            accessor  : "name",
                            filterable: true,
                            className : "font-bold"
                        },
                        {
                            Header    : "รหัสโรงเรือน",
                            accessor  : "greenHouseId",
                            filterable: true,
                        },
                        {
                            Header    : "IP",
                            accessor  : "ip",
                            filterable: true,
                        },
                        {
                            Header    : "รหัสเครื่อง",
                            accessor  : "mac_address",
                            filterable: true
                        },
                        {
                            Header    : "ปั๊มน้ำ",
                            accessor  : "water",
                            filterable: true
                        },
                        {
                            Header    : "ปั๊มปุ๋ย",
                            accessor  : "fertilizer",
                            filterable: true
                        },
                        {
                            Header    : "ปั๊มความชื้น",
                            accessor  : "moisture",
                            filterable: true
                        },
                        {
                            Header    : "หลอดไฟ",
                            accessor  : "light",
                            filterable: true
                        },
                        {
                            Header:                                     
                            <IconButton
                                onClick={(ev) => {
                                    ev.stopPropagation();
                                    buttonCreate(this.props.greenHouseId,null);
                                }}
                            >
                                <Icon>add_box</Icon>
                            </IconButton>,
                            width : 128,
                            Cell  : row => (
                                <div className="flex items-center">
                                    <IconButton
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            buttonEdit(row.original);
                                        }}
                                    >
                                        <Icon>edit</Icon>
                                    </IconButton>
                                    <IconButton
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            buttonDelete(row.original.mac_address);
                                        }}
                                    >
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </div>
                            )
                        }
                    ]}
                    defaultPageSize={5}
                    noDataText="ไม่มีคอนโทรลเลอร์ในโรงเรือนนี้"
                />
            </FuseAnimate>
            
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

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps)(GreenHouseControllerList))
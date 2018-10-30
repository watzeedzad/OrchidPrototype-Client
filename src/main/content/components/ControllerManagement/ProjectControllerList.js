import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FuseAnimate } from '@fuse';
import { Icon, IconButton} from '@material-ui/core';
import ReactTable from "react-table";
import classNames from 'classnames';

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

    render() {
        const { classes,data,buttonDelete,buttonEdit,buttonCreate } = this.props;
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
                data={data}
                columns={[
                    {
                        Header    : "ชื่อ",
                        accessor  : "name",
                        filterable: true,
                        className : "font-bold"
                    },
                    {
                        Header    : "รหัสโปรเจ็ค",
                        accessor  : "projectId",
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
                        Cell  : row => (<div>
                            {data[0].relayType.water? <Icon>check</Icon>:<Icon>close</Icon>}
                            </div>
                        ),
                        filterable: false
                    },
                    {
                        Header    : "ปั๊มปุ๋ย",
                        Cell  : row => (<div>
                            {data[0].relayType.fertilizer? <Icon>check</Icon>:<Icon>close</Icon>}
                            </div>
                        ),
                        filterable: false
                    },
                    {
                        Header    : "ปั๊มความชื้น",
                        Cell  : row => (<div>
                            {data[0].relayType.moisture? <Icon>check</Icon>:<Icon>close</Icon>}
                            </div>
                        ),
                        filterable: false
                    },
                    {
                        Header    : "หลอดไฟ",
                        Cell  : row => (<div>
                            {data[0].relayType.light? <Icon>check</Icon>:<Icon>close</Icon>}
                            </div>
                        ),
                        filterable: false
                    },
                    {
                        Header: 
                        <IconButton
                                onClick={(ev) => {
                                    ev.stopPropagation();
                                    buttonCreate(this.props.greenHouseId,this.props.projectId);
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
                                        buttonDelete(row.original._id);
                                    }}
                                >
                                    <Icon>delete</Icon>
                                </IconButton>
                            </div>
                        )
                    }
                ]}
                defaultPageSize={3}
                noDataText="ไม่มีคอนโทรลเลอร์ในโปรเจ็คนี้"
            />
            </FuseAnimate>
        );
    }

}

GreenHouseControllerList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(GreenHouseControllerList)
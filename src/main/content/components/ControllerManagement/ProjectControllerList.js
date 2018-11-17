import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FuseAnimate } from '@fuse';
import { Icon, IconButton} from '@material-ui/core';
import ReactTable from "react-table";
import classNames from 'classnames';
import { connect } from 'react-redux';

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
        const { classes,data,buttonDelete,buttonEdit,buttonCreate,auth } = this.props;

        const columns = [
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
                        id        : 'water',
                        Header    : "ปั๊มน้ำ",
                        accessor  : d => (<div>
                            {d.relayType.water? <Icon>check</Icon>:<Icon>close</Icon>}
                            </div>
                        ),
                        filterable: false
                    },
                    {   
                        id        : 'fertilizer',
                        Header    : "ปั๊มปุ๋ย",
                        accessor  : d => (<div>
                            {d.relayType.fertilizer? <Icon>check</Icon>:<Icon>close</Icon>}
                            </div>
                        ),
                        filterable: false
                    },
                    {   
                        id        : 'moisture',
                        Header    : "ปั๊มความชื้น",
                        accessor  : d => (<div>
                            {d.relayType.moisture? <Icon>check</Icon>:<Icon>close</Icon>}
                            </div>
                        ),
                        filterable: false
                    },
                    {   
                        id        : 'light',
                        Header    : "หลอดไฟ",
                        accessor  : d => (<div>
                            {d.relayType.light? <Icon>check</Icon>:<Icon>close</Icon>}
                            </div>
                        ),
                        filterable: false
                    }
                ]
        if(auth.data.user.role === 'เจ้าของฟาร์ม'){
            columns.push(
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
            )
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
                data={data}
                columns={columns}
                defaultPageSize={3}
                noDataText="ไม่มีคอนโทรลเลอร์ในโปรเจ็คนี้"
            />
            </FuseAnimate>
        );
    }

}

function mapStateToProps({application}) {
    return {
        auth       : application.loginReducers.auth
    }
}

GreenHouseControllerList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps)(GreenHouseControllerList))
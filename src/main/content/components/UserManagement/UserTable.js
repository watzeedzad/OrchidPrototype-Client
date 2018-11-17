import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import {FuseUtils, FuseAnimate} from '@fuse';
import {Avatar, Checkbox, Icon, IconButton,Typography,Button} from '@material-ui/core';
import ReactTable from "react-table";
import classNames from 'classnames';
import {connect} from 'react-redux';

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

class UserTable extends Component {

    state = {
        selectedContactsMenu: null
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if ( searchText.length === 0 )
        {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    openSelectedContactMenu = (event) => {
        this.setState({selectedContactsMenu: event.currentTarget});
    };

    closeSelectedContactsMenu = () => {
        this.setState({selectedContactsMenu: null});
    };

    render()
    {
        const {classes, data,buttonCreate,buttonEdit, buttonDelete,auth} = this.props;

        if ( !data || data.length === 0 )
        {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no contacts!
                    </Typography>
                </div>
            );
        }

        const columns = [
                        {
                            Header    : "ประเภทผู้ใช้",
                            accessor  : "role",
                            filterable: true,
                            className : "font-bold"
                        },
                        {
                            Header    : "ชื่อ",
                            accessor  : "firstname",
                            filterable: true,
                        },
                        {
                            Header    : "นามสกุล",
                            accessor  : "lastname",
                            filterable: true,
                        },
                        {
                            Header    : "ไอดีผู้ใช้",
                            accessor  : "username",
                            filterable: true
                        }
                    ]
        if(auth.data.user.role === 'เจ้าของฟาร์ม'){
            columns.push(
                        {
                            Header: <Button
                                        variant="fab"
                                        color="primary"
                                        aria-label="add"
                                        className={classes.addButton}
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            buttonCreate();
                                        }}
                                    >
                                        <Icon>person_add</Icon>
                                    </Button>,
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
                        })
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
                    defaultPageSize={10}
                    noDataText="ไม่มีรายชื่อผู้ใช้งาน"
                />
            </FuseAnimate>
        );
    }
}

function mapStateToProps({application})
{
    return {
        auth       : application.loginReducers.auth
    }
}


export default withStyles(styles, {withTheme: true})(connect(mapStateToProps)(withRouter(UserTable)));

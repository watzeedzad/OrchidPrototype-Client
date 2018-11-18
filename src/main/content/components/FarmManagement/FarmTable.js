import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import {FuseUtils, FuseAnimate} from '@fuse';
import {Avatar, Checkbox, Icon, IconButton,Typography,Button} from '@material-ui/core';
import ReactTable from "react-table";
import classNames from 'classnames';

const styles = theme => ({
    mailList:{
        padding: 0 
    },
    mailItem: {},
    avatar:{
        backgroundColor: theme.palette.primary[500]
    },
    labels : {}

});


class FarmTable extends Component {

    state = {
        selectedContactsMenu: null
    }

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

    render(){
        const {classes, data ,buttonCreate ,buttonEdit} = this.props;

        if(!data || data.length === 0){
            return(
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no farms!
                    </Typography>
                </div>
            );
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
                    columns={[
                        {
                            Header : "ชื่อฟาร์ม",
                            accessor : "farmName",
                            filterable : true
                        },
                        {
                            Header : "ชื่อเจ้าของฟาร์ม",
                            accessor : "ownerName",
                            filterable : true
                        },
                        {
                            Header : "นามสกุลเจ้าของฟาร์ม",
                            accessor : "ownerSurname",
                            filterable : true
                        },
                        {
                            Header : "เบอร์โทร",
                            accessor : "ownerTel",
                            filterable : true
                        },
                        {
                            Header : "ที่อยู่",
                            accessor : "ownerAddress",
                            filterable : true
                        },
                        {
                            Header : "Pi MacAddress",
                            accessor : "piMacAddress",
                            filterable : true
                        },
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
                                        <Icon>add_box</Icon>
                                    </Button>,
                            width : 128,
                            Cell : row =>(
                                <div className= "flex item-center">
                                    <IconButton
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            buttonEdit(row.original);
                                        }}
                                    >
                                        <Icon>edit</Icon>
                                    </IconButton>
                                </div>
                            )
                        }
                    ]}
                    defaultPageSize={10}
                    noDataText="ไม่มีข้อมูลฟาร์ม"
                />
            </FuseAnimate>
        );
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(FarmTable))
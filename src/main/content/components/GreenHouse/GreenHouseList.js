import React, {Component} from 'react';
import {withStyles, Typography, Icon, Avatar, IconButton, SnackbarContent} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {FuseAnimateGroup, FuseAnimate} from '@fuse';
import { showGreenHouse, resetStatus, addGreenHouse, deleteGreenHouse, editGreenHouse } from 'store/actions/application/greenHouseActions'
import GreenHouseDialog from './GreenHouseDialog';
import { confirmModalDialog } from 'main/Utils/reactConfirmModalDialog'
import { setNavigation } from 'store/actions/fuse/navigation.actions'
import { farmNavigation } from 'fuse-configs/fuseNavigationConfig';
import { setSettings } from 'store/actions/fuse/settings.actions'
import {PageConfig} from '../../pages/PageConfig'

const styles = theme => ({
    root    : {
        background: theme.palette.primary.main,
        color     : theme.palette.getContrastText(theme.palette.primary.main)
    },
    board   : {
        cursor                  : 'pointer',
        boxShadow               : theme.shadows[0],
        transitionProperty      : 'box-shadow border-color',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        background              : theme.palette.primary.dark,
        color                   : theme.palette.getContrastText(theme.palette.primary.dark),
        '&:hover'               : {
            boxShadow: theme.shadows[6]
        }
    },
    boardFooter   : {
        marginBottom               : theme.spacing.unit * 4,
        cursor                  : 'pointer',
        boxShadow               : theme.shadows[0],
        transitionProperty      : 'box-shadow border-color',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        background              : "lightgrey",
        color                   : theme.palette.getContrastText(theme.palette.primary.dark),
    },
    newBoard: {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: fade(theme.palette.getContrastText(theme.palette.primary.main), 0.6),
        '&:hover'  : {
            borderColor: fade(theme.palette.getContrastText(theme.palette.primary.main), 0.8)
        }
    },
    avatar: {
        width     : 144,
        height    : 144,
    }
});


class GreenHouseList extends Component {

    state = {
        dialog: false,
        dialogTitle: '',
        data: [],
        selectedFile: null,
        picture: null
    }

    componentDidMount()
    {   
        this.props.dispatch(setSettings(PageConfig.settings))
        this.props.dispatch(setNavigation(farmNavigation))
        this.props.dispatch(showGreenHouse());
    }

    render()
    {
        const {classes, greenHouses, greenHouseSave, auth} = this.props;

        if (greenHouses.isRejected) {
            return <SnackbarContent className="bg-red-light" message={"Error: "+greenHouses.data}/>
        }
        if (greenHouses.isLoading) {
            return <Typography variant="body1">Loading...</Typography>
        }
        console.log(greenHouses)
        return (
            <div className={classNames(classes.root, "flex flex-grow flex-no-shrink flex-col items-center")}>

                <FuseAnimate>
                    <Typography className="mt-44 sm:mt-88 sm:py-24 text-32 sm:text-40 font-300" color="inherit">จัดการโรงเรือน</Typography>
                </FuseAnimate>

                <div>
                    <FuseAnimateGroup
                        className="flex flex-wrap w-full justify-center py-32 px-16"
                        enter={{
                            animation: "transition.slideUpBigIn",
                            duration : 300
                        }}
                    >
                        {greenHouses.data && !greenHouses.data.errorMessage && greenHouses.data.map(e => (
                            <div className="w-xs p-16 pb-64" key={e._id}>
                                <Link 
                                    to={{
                                        pathname: '/project',
                                        state: { greenHouse: e }
                                    }}
                                    className={classNames(classes.board, "flex flex-col items-center justify-center w-full h-full rounded py-24")}
                                    role="button"
                                >
                                    <Avatar
                                        className={classNames(classes.avatar, "avatar")}
                                        alt="greenhouse photo"
                                        src={!e.picturePath?"assets/images/farm/defaultIMG.jpg":"assets/images/greenHouse/"+e.picturePath}
                                    />
                                    <Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">รหัส : {e.greenHouseId}</Typography>
                                    <Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">ชื่อ : {e.name}</Typography>
                                    <Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">คำอธิบาย : {e.desc?e.desc:' - '}</Typography>
                                    
                                </Link>
                                {auth.data !== null && auth.data.user.role === 'เจ้าของฟาร์ม' &&
                                    <div className={classNames(classes.boardFooter, "flex justify-end")}>
                                            <IconButton
                                                onClick={(ev) => {
                                                    ev.stopPropagation();
                                                    this.handleEdit(e)
                                                }}
                                            >
                                                <Icon>edit</Icon>
                                            </IconButton>
                                            <IconButton
                                                onClick={(ev) => {
                                                    ev.stopPropagation();
                                                    this.handleDelete(e._id)
                                                }}
                                            >
                                                <Icon>delete</Icon>
                                            </IconButton>
                                    </div>
                                }
                            </div>
                        ))}
                        {auth.data !== null && auth.data.user.role === 'เจ้าของฟาร์ม' &&
                            <div className="w-xs p-16 pb-64">
                                <div
                                    className={classNames(classes.board, classes.newBoard, "flex flex-col items-center justify-center w-full h-full rounded py-24")}
                                    onClick={() => this.handleNew()}
                                >
                                    <Icon className="text-56">add_circle</Icon>
                                    <Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">เพิ่มโรงเรือนใหม่</Typography>
                                </div>
                            </div>
                        }
                    </FuseAnimateGroup>

                </div>
                <GreenHouseDialog
                    isOpen={this.state.dialog} 
                    dialogTitle={this.state.dialogTitle}
                    data={this.state.data}
                    greenHouseSave={greenHouseSave}
                    onSubmit={this.handleSubmit}
                    fileChangedHandler={this.fileChangedHandler}
                    selectedFile={this.state.selectedFile}
                    onToggle={this.toggle}/>
            </div>
        );
    }

    toggle = () => {
        this.setState({
            dialog: !this.state.dialog,
            selectedFile: null
        })
    }

    //ฟังก์ชันสร้างข้อมูลใหม่โดยจะสั่งให้เปิด Modal
    handleNew = () => {
        this.props.dispatch(resetStatus())

        this.setState({ dialogTitle: 'เพิ่ม' })
        this.toggle();
    }

    //ฟังก์ชันแก้ไขข้อมูล และสั่งให้เปิด Modal โดยส่งข้อมูลไปแป๊ะให้กับฟอร์มด้วย
    handleEdit = (data) => {
        this.props.dispatch(resetStatus())
        
        this.setState({ dialogTitle: 'แก้ไข' ,data: data})
        this.toggle()
    }

    //ฟังก์ชันบันทึกข้อมูล
    handleSubmit = (values) => {
        if(this.state.dialogTitle === 'เพิ่ม'){
            this.props.dispatch(addGreenHouse(values,this.state.picture)).then(() => {
                this.toggle()
                this.props.dispatch(showGreenHouse());
            })
        }else if(this.state.dialogTitle === 'แก้ไข'){
            this.props.dispatch(editGreenHouse(values,this.state.picture)).then(() => {
                this.toggle()
                this.props.dispatch(showGreenHouse());                
            })
        }
    }

    //ฟังก์ชันลบข้อมูล
    handleDelete = (id) => {
        confirmModalDialog({
            show: true,
            title: 'ยืนยันการลบ',
            message: 'คุณต้องการลบข้อมูลนี้ใช่หรือไม่',
            confirmLabel: 'ยืนยัน ลบทันที!!',
            onConfirm: () => this.props.dispatch(deleteGreenHouse({id:id})).then(() => {
                this.props.dispatch(showGreenHouse());
            })
        })
    }

    fileChangedHandler = (event) => {
        this.setState({picture: event.target.files[0],selectedFile: URL.createObjectURL(event.target.files[0])})
    }
}


function mapStateToProps({application})
{
    return {
        greenHouses: application.greenHouseReducers.greenHouses,
        greenHouseSave: application.greenHouseReducers.greenHouseSave,
        auth: application.loginReducers.auth
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps)(GreenHouseList));

import React, {Component} from 'react';
import {withStyles, Typography, Icon, Avatar} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {FuseAnimateGroup, FuseAnimate} from '@fuse';
import { showGreenHouse } from 'store/actions/application/greenHouseActions'
import SnackbarContent from '@material-ui/core/SnackbarContent';


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
        // position  : 'absolute',
        // top       : 92,
        // padding   : 8,
        // background: theme.palette.background.default,
        // boxSizing : 'content-box',
        // left      : '50%',
        // transform : 'translateX(-50%)',
        // '& > img' : {
        //     borderRadius: '50%'
        // }
    }
});


class GreenHouseList extends Component {

    componentDidMount()
    {
        this.props.dispatch(showGreenHouse());
    }

    render()
    {
        const {classes, greenHouses, newBoard} = this.props;
        console.log(greenHouses)

        if (greenHouses.isRejected) {
            return <SnackbarContent className="bg-red-light" message={"Error: "+greenHouses.data}/>
        }
        if (greenHouses.isLoading) {
            return <Typography variant="body1">Loading...</Typography>
        }

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
                        {greenHouses.data && greenHouses.data.map(e => (
                            <div className="w-xs p-16" key={greenHouses._id}>
                                <Link
                                    to={'/weatherControl'}
                                    className={classNames(classes.board, "flex flex-col items-center justify-center w-full h-full rounded py-24")}
                                    role="button"
                                >
                                    <Avatar
                                        className={classNames(classes.avatar, "avatar")}
                                        alt="user photo"
                                        src={"assets/images/farm/123456789.jpg"}
                                    />
                                    <Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">รหัส : {e.greenHouseId}</Typography>
                                    <Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">ชื่อ : {e.name}</Typography>
                                    <Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">คำอธิบาย : {e.desc?e.desc:' - '}</Typography>
                                </Link>
                            </div>
                        ))}
                        <div className="w-xs p-16">
                            <div
                                className={classNames(classes.board, classes.newBoard, "flex flex-col items-center justify-center w-full h-full rounded py-24")}
                                // onClick={() => newBoard()}
                            >
                                <Icon className="text-56">add_circle</Icon>
                                <Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">เพิ่มโรงเรือนใหม่</Typography>
                            </div>
                        </div>
                    </FuseAnimateGroup>

                </div>
            </div>
        );
    }
}


function mapStateToProps({application})
{
    return {
        greenHouses: application.greenHouseReducers.greenHouses
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps)(GreenHouseList));

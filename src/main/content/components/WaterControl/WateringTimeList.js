import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Icon, IconButton, Grid, Button, Dialog, SnackbarContent, DialogContent, Paper, Typography, Toolbar, AppBar
} from '@material-ui/core';
import ClockPiker from '../../../Utils/ClockPicker';
import { confirmModalDialog } from '../../../Utils/reactConfirmModalDialog'
import { saveWaterConfig } from 'store/actions/application/waterActions'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {withStyles} from '@material-ui/core/styles/index';

const styles = theme => ({
    root       : {},
    formControl: {
        marginBottom: 24
    },
    layout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.
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
        marginBottom: theme.spacing.unit * 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#6FCEE6',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
});

class WateringTimeList extends Component {
    
    state = {
        setTimeList: [],
        modal: false,
        visible: true,
        mss: ''
    }

    componentDidMount() {
        const wateringTimeList = this.props.wateringTimeList
        this.setState({
            mss:this.props.mss
        })
        if (wateringTimeList.data!=null){    
            if (wateringTimeList.data.timeRanges.length>0){
                const newArr = []
                for (let index = 0; index < wateringTimeList.data.timeRanges.length; index++) {
                    const mills = wateringTimeList.data.timeRanges[index];
                    const date = new Date(mills)
                    newArr.push(date)
                }
                this.setState({setTimeList:newArr})
            }
        }
    }
    
    render() {
        const { classes,waterConfig} = this.props

        if (waterConfig.isRejected) {
            return <SnackbarContent className="bg-red-light" message={"Error: "+waterConfig.data}/>
        }

        return (
            <Grid container spacing={24}>
                <Grid item xs={12} sm={12} md={12}>
                    <div className="p-24 pl-80">
                        {this.state.mss}
                    </div>
                    <div className="pl-80">
                        <Button variant="contained" color="primary" onClick={() => this.toggle()}>เพิ่มเวลา</Button>
                    </div>
                    <Dialog
                        classes={{
                            root : classes.root,
                            paper: "m-24"
                        }}
                        className={classes.root}
                        onClose={this.toggle}
                        open={this.state.modal}
                        fullWidth
                        maxWidth="xs"
                    >
                        <AppBar position="static" elevation={1}>
                            <Toolbar className="flex w-full">
                                <Typography variant="subtitle1" color="inherit">
                                    ตั้งเวลารดน้ำ
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <DialogContent classes={{root: "p-24"}}>
                            <div align="center">
                                <ClockPiker toggle={this.toggle} addTime={this.addTime}/>
                            </div>
                        </DialogContent>
                    </Dialog>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <main className={classes.layout}>
                        <Paper className={classes.paper}>
                            <VerticalTimeline>
                            {this.state.setTimeList.length > 0 && this.state.setTimeList.map((e,index) => {
                                let hour = e.getHours()<10? '0'+e.getHours():e.getHours()
                                let minute = e.getMinutes()<10? '0'+e.getMinutes():e.getMinutes()
                                let time = hour+":"+minute+" น. หรือ "+this.tConvert(hour+":"+minute)
                                return (    
                                    <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                    >
                                        <div className="flex">                                   
                                            <div className="p-12">
                                                <Typography variant="h6">{time}</Typography>
                                            </div>
                                            <div className="pl-60 pt-4">
                                                <IconButton
                                                    onClick={() => this.buttonDelete(index)}
                                                    >
                                                        <Icon>close</Icon>
                                                </IconButton>
                                            </div>
                                        </div>   
                                    </VerticalTimelineElement>
                                )
                            })}
                            </VerticalTimeline>
                        </Paper>
                    </main>
                </Grid>
            </Grid>
        )
    }

    onSubmit = (values) => {
        //เมื่อบันทึกข้อมูลเสร็จสังให้ไปยัง route /
        this.props.dispatch(saveWaterConfig(values)).then(() => {
            this.props.onToggle()
        })
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    checkDuplicateTime = (val,curTimeList) => {
        for (let index = 0; index < curTimeList.length; index++) {
            const time = curTimeList[index];
            if(time.getTime()==val.getTime()){
                return false;
            }
        }
        return true;
    }

    addTime = (val) => {
        if(this.checkDuplicateTime(val,this.state.setTimeList)){
        var newArray = this.state.setTimeList.slice();    
        newArray.push(val);
        newArray.sort();
        this.onSubmit({greenHouseId:this.props.greenHouseId,timeRanges:newArray})
        }else{
            this.setState({
                mss: <SnackbarContent className="bg-red-light" message="เวลาที่เลือกซ้ำกับที่เคยตั้งไว้"/>
            })
        }
    }

    onDismiss = () => {
        this.setState({ mss: '' });
    }

    tConvert = (time) => {
        var time_part_array = time.split(":");
        var ampm = ' AM';
    
        if (time_part_array[0] >= 12) {
            ampm = ' PM';
        }   
        if (time_part_array[0] > 12) {
            time_part_array[0] = time_part_array[0] - 12;
        }
        if (time_part_array[0] < 10 && ampm ==' PM') {
            time_part_array[0] = "0"+time_part_array[0] ;
        }
        var formatted_time = time_part_array[0] + ':' + time_part_array[1] + ampm;    
        return formatted_time;
    }

    buttonDelete = (index) => {
        confirmModalDialog({
            show: true,
            title: 'ยืนยันการลบ',
            message: 'คุณต้องการลบข้อมูลนี้ใช่หรือไม่',
            confirmLabel: 'ยืนยัน ลบทันที!!',
            onConfirm: () => {
                var newArray = this.state.setTimeList.slice()
                newArray.splice(index,1)
                this.props.dispatch(saveWaterConfig({greenHouseId:this.props.greenHouseId,timeRanges:newArray})).then(() => {
                    this.props.onDelete()
                })
            }
        })
    }

}

function mapStateToProps({application}) {
    return {
        waterConfig: application.waterReducers.waterConfig,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps)(WateringTimeList))
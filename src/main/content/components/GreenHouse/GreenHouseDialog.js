import React, {Component} from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, Icon, Typography, Toolbar, AppBar, Avatar
} from '@material-ui/core';
import {TextFieldFormsy} from '@fuse';
import Formsy from 'formsy-react';
import {withStyles} from '@material-ui/core/styles/index';
import _ from '@lodash';
import classNames from 'classnames';

const styles = theme => ({
    root       : {},
    formControl: {
        marginBottom: 24
    },
    avatar: {
        width     : 144,
        height    : 144,
    }
});

class GreenHouseDialog extends Component {

    constructor() {
        super();
        this.state = {
            id : '',
            name : '',
            desc : '',
            picturePath : null,
            canSubmit: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    form = React.createRef();

    componentWillReceiveProps(nextProps){
        const {data} = nextProps
        if (data._id) {
            this.setState({ 
                id : data._id,
                name : data.name,
                desc : data.desc,
                picturePath : data.picturePath,
            })
        }else {
            this.setState({ 
                name : '',
                desc : '',
                picturePath : null,
            })
        }
    }

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };
    
    render()
    {
        const {classes, dialogTitle, fileChangedHandler} = this.props;
        
        let picture = null;
        if(this.props.selectedFile === null){
            if(this.state.picturePath === null){
                picture =   <Avatar
                                className={classNames(classes.avatar, "avatar")}
                                alt="greenhouse photo"
                                src={"assets/images/farm/defaultIMG.jpg"}
                            />
            }else{
                picture =   <Avatar
                                className={classNames(classes.avatar, "avatar")}
                                alt="greenhouse photo"
                                src={"assets/images/greenHouse/"+this.state.picturePath}
                            />
            }
        }else {
            picture =   <Avatar
                            className={classNames(classes.avatar, "avatar")}
                            alt="greenhouse photo"
                            src={this.props.selectedFile}
                        />
        }
        return (
            <Dialog
                classes={{
                    root : classes.root,
                    paper: "m-24"
                }}
                className={classes.root}
                onClose={this.toggle}
                open={this.props.isOpen}
                fullWidth
                maxWidth="xs"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {dialogTitle}โรงเรือน
                        </Typography>
                    </Toolbar>
                </AppBar>
                
                <Formsy
                    onValidSubmit={this.onSubmit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    ref={(form) => this.form = form}
                    className="flex flex-col justify-center"
                >
                
                    <DialogContent classes={{root: "p-24"}}>

                        <div className="flex pb-24">
                            <div className="min-w-36 pt-20">
                            </div>
                            <div className="flex flex-col">
                                <input type="file" onChange={fileChangedHandler} />
                                <div className="justify-center pt-16">
                                    {picture}
                                </div>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="min-w-48 pt-20">
                                {/* <Icon color="action">account_circle</Icon> */}
                            </div>
                            
                            <TextFieldFormsy
                                className={classes.formControl}
                                label="ชื่อโรงเรือน"
                                autoFocus
                                type="text"
                                id="name"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                                variant="outlined"
                                required
                                fullWidth
                            />
                        </div>

                        <div className="flex">
                            <div className="min-w-48 pt-20">
                            </div>
                            <TextFieldFormsy
                                className={classes.formControl}
                                label="คำอธิบาย"
                                type="text"
                                id="desc"
                                name="desc"
                                value={this.state.desc}
                                onChange={this.handleChange}
                                variant="outlined"
                                fullWidth
                                required
                            />
                        </div>

                        <TextFieldFormsy
                            type="hidden"
                            id="id"
                            name="id"
                            value={this.state.id}
                        />

                    </DialogContent>

                    <DialogActions className="justify-between pl-16">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={!this.state.canSubmit}
                        >
                            บันทึก
                       </Button>
 
                    </DialogActions>
                
                </Formsy>

            </Dialog>
        );
    }

    toggle = () => {
        this.props.onToggle()
    }

    //ฟังก์ชันส่งการค่าการ submit โดยส่งให้ฟังก์ชันชื่อ onSubmit ที่ได้จาก props
    onSubmit = (values) => {
        this.props.onSubmit(values);
    }
}

export default withStyles(styles, {withTheme: true})(GreenHouseDialog);

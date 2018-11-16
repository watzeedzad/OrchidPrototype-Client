import React, {Component} from 'react';
import {FormControlLabel, Dialog , Button ,Typography ,AppBar} from '@material-ui/core';
import {TextFiledFormy} from '@fuse';
import Formsy from 'formsy-react';
import {withStyles} from '@material-ui/core/styles/index';
import _ from '@lodash';


const styles = theme => ({
    root : {},
    formControl: {
        marginBottom: 24
    }
});


class FarmDialog extends Component{
    consturctor(){
        super();
        this.state={
            farmName : '',
            owenerName : '',
            ownerSurname : '',
            ownerTel : '',
            configFilePath : '',
            piMacAddress : '',
            canSubmit : false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    form = React.createRef();

    componentWillReciveProps(nextProps){
        const {data} = nextProps
        if(data._id){
            this.setState({
                farmName : data.farmName,
                ownerName : data.ownerName,
                ownerSurname : data.ownerSurname,
                ownerTel : data.ownerTel,
                configFilePath: data.configFilePath,
                piMacAddress : data.piMacAddress
            })
        }else{
            this.setState({
                farmName : '',
                ownwerName : '',
                ownerSurname : '',
                ownerTel : '',
                configFilePath : '',
                piMacAddress : ''
            });
        }
    }

    disableButton = () =>{
        this.setState({canSubmit: false});
    };

    enableButton = () =>{
        this.setState({canSubmit: true});
    }
     
    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name ));
    }

    render(){

        const {classes, dialogTitle ,fileChangedHandler} = this.props;

        return(
            <Dialog
                classes={{
                    root : classes.root ,
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
                        {dialogTitle}ฟาร์ม
                    </Typography>
                </Toolbar>
            </AppBar>

                <Formsy 
                    onValidSubmit = {this.onSubmit}
                    onValid = {this.enableButton}
                    onInvalid = {this.disableButton}
                    ref = {(form) => this.form = form}
                    className = "felx flex-col justify-center"
                >
                    <DialogContent classes={{root: "p-24"}}>
                        <div className="flex">
                            <div className="min-w-48 pt-20">
                            </div>
                            <TextFieldFormy
                                className={classes.formControl}
                                label="ชื่อฟาร์ม"
                                autoFocud
                                type="text"
                                id="farmName"
                                name="farmName"
                                value={this.state.farmName}
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
                                label="ชื่อเจ้าของฟาร์ม"
                                type="text"
                                id="ownwerName"
                                name="ownwerName"
                                value={this.state.ownwerName}
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
                                label="นามสกุลเจ้าของฟาร์ม"
                                type="text"
                                id="ownerSurname"
                                name="ownerSurname"
                                value={this.state.ownerSurname}
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
                                label="เบอร์โทร์ศัพท์"
                                type="number"
                                id="ownerTel"
                                name="ownerTel"
                                value={this.state.ownerTel}
                                variant="outlined"
                                required
                                fullWidth
                            />      
                        </div>

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
                                </div>
                                <TextFieldFormsy
                                    className={classes.formControl}
                                    label="Pi-MacAddress"
                                    type="text"
                                    id="piMacAddress"
                                    name="piMacAddress"
                                    value={this.state.piMacAddress}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />      
                        </div>

                            <TextFieldFormsy
                                className={classes.formControl}
                                autoFocus
                                type="hidden"
                                id="_id"
                                name="_id"
                                value={this.props.data._id}
                                onChange={this.handleChange}
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
        )
    }

    toggle = () => {
        this.props.onToggle()
    }

    onSubmit = (value) => {
        this.props.onSubmit(values);
    }
}


export default withStyles(styles, {withTheme:true})(FarmDialog)
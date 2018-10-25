import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import {FusePageCarded} from '@fuse';
import {Tab, Tabs, Typography} from '@material-ui/core';
import { getGreenHouse,deleteController,editController } from 'store/actions/application/controllerActions'
import GreenHouseControllerList from './GreenHouseControllerList';
import { confirmModalDialog } from 'main/Utils/reactConfirmModalDialog'
import ControllerForm from './ControllerForm'
import ProjectTabs from './ProjectTabs';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  layoutRoot   : {},
    layoutToolbar: {
        padding: 0
    },
    tabsRoot     : {
        height: 64
    },
    tabRoot      : {
        height: 64
    }
});

class GreenHouseTabs extends Component {
  state = {
    value: 0,
    mss: '',
    dialog: false,
    dialogTitle: '',
    controllerData: []
  };

  componentDidMount() {
    this.props.dispatch(getGreenHouse())
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };
  
  render() {
    const { classes,greenHouses } = this.props;
    const { value } = this.state;
    
    if (greenHouses.isRejected) {
      return <div className="alert alert-danger">Error: {greenHouses.data}</div>
    }
    if (greenHouses.isLoading) {
      return <div>Loading...</div>
    }
    if (greenHouses.data.errorMessage){
      return <div className="alert alert-danger">{greenHouses.data.errorMessage}</div>
    }

    return (
      <React.Fragment>
        <FusePageCarded
          classes={{
              root   : classes.layoutRoot,
              toolbar: classes.layoutToolbar
          }}
          header={
              <div className="py-24"><h4>Header</h4></div>
          }
          contentToolbar={
            <Tabs
              value={value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              scrollable
              scrollButtons="auto"
              classes={{root: "w-full h-64"}}
            >
              {greenHouses.data && greenHouses.data.map((e,index) => {
                let label = "โรงเรือนที่ "+(parseInt(index)+1)
                return (
                  <Tab 
                    classes={{
                      root: classes.tabRoot
                    }}
                    label={"รหัสโรงเรือน : "+greenHouses.data[index].greenHouseId}
                  />
                )
              })}
            </Tabs>
          }
          content={
            <div className="p-24">
              {greenHouses.data && greenHouses.data.map((e,index) => {
                return (
                  value === index && 
                  <TabContainer>
                    <h3 className="mb-16">รายชื่อคอนโทรลเลอร์ในโรงเรือน</h3>
                    <GreenHouseControllerList 
                      greenHouseId={e.greenHouseId}
                      buttonCreate={this.handleNew} 
                      buttonDelete={this.handleDelete}
                      buttonEdit={this.handleEdit}/>
                    <br/><br/><hr/>
                    <ProjectTabs 
                      greenHouseId={e.greenHouseId}
                      buttonCreate={this.handleNew} 
                      buttonDelete={this.handleDelete}
                      buttonEdit={this.handleEdit}/>
                  </TabContainer>
                )
              })}
            </div>
          }
        />
        <ControllerForm
          isOpen={this.state.dialog} 
          dialogTitle={this.state.dialogTitle}
          data={this.state.controllerData}
          onSubmit={this.handleSubmit}
          onToggle={this.toggle} />
      </React.Fragment>
    );
  }

  toggle = () => {
    this.setState({
      dialog: !this.state.dialog
    })
  }

  handleNew = (greenHouseId,projectId) => {
    this.setState({ dialogTitle: 'เพิ่ม' ,controllerData: {greenHouseId: greenHouseId, projectId: projectId} })
    this.toggle();
  }

  handleEdit = (data) => {
    this.setState({ dialogTitle: 'แก้ไข' ,controllerData: data})
    this.toggle()
  }

  handleSubmit = (values) => {
    this.props.dispatch(editController(values)).then(() => {
        this.toggle()
        this.props.dispatch(getGreenHouse())       
    })
  }

  handleDelete = (macAddress) => {
    confirmModalDialog({
        show: true,
        title: 'ยืนยันการลบ',
        message: 'คุณต้องการลบคอนโทรลเลอร์นี้ใช่หรือไม่',
        confirmLabel: 'ยืนยัน ลบทันที!!',
        onConfirm: () => {
            this.props.dispatch(deleteController({macAddress: macAddress})).then(() => {
              this.props.dispatch(getGreenHouse())
            })
        }
    })
  }

}

function mapStateToProps({application}) {
  return {
    greenHouses: application.controllerReducers.greenHouses,
  }
}

GreenHouseTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles, {withTheme: true})(GreenHouseTabs));

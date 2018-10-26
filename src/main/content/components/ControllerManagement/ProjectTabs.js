import React, { Component } from 'react';
import { getProject,getProjectController } from 'store/actions/application/controllerActions'
import { connect } from 'react-redux'
import ProjectControllerList from './ProjectControllerList'
import {Typography} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import SnackbarContent from '@material-ui/core/SnackbarContent';

class ProjectTabs extends Component {

    componentDidMount() {
        this.props.dispatch(getProject({greenHouseId: this.props.greenHouseId }))
        this.props.dispatch(getProjectController({ greenHouseId: this.props.greenHouseId }))   
    }

    render() {
        const { projects,pController } = this.props

        if (projects.isRejected) {
            return <SnackbarContent className="bg-red-light" message={"Error: "+projects.data}/>
        }
        if (pController.isRejected) {
            return <SnackbarContent className="bg-red-light" message={"Error: "+pController.data}/>
        }
        if (projects.isLoading || pController.isLoading) {
            return <Typography variant="body1">Loading...</Typography>
        }
        if (projects.data.errorMessage){
            return <SnackbarContent className="bg-red-light" message={projects.data.errorMessage}/>
        }

        return (
            <Grid container spacing={24}>
                <Typography variant="headline">รายชื่อคอนโทรลเลอร์ที่อยู่ในเเต่ละโปรเจ็ค</Typography>
                    {projects.data && projects.data.map(e => {
                        let breakLoop = true; 
                        return (
                            <Grid item xs={10} sm={10} md={10}>
                                <Typography variant="subtitle1">รหัสโปรเจ็ค : {e.projectId}</Typography>
                                {pController.data.errorMessage
                                ? <SnackbarContent className="bg-red-light" message={pController.data.errorMessage}/>
                                :pController.data && pController.data.map((c,index) => {                               
                                    if(c.controllerData[0].projectId === e.projectId){
                                        breakLoop = false
                                        return (
                                            <React.Fragment>
                                                <ProjectControllerList
                                                    greenHouseId={this.props.greenHouseId}
                                                    projectId={e.projectId} 
                                                    data={c.controllerData}
                                                    buttonCreate={this.props.buttonCreate} 
                                                    buttonDelete={this.props.buttonDelete}
                                                    buttonEdit={this.props.buttonEdit}/>
                                                <hr/>
                                            </React.Fragment>                                              
                                        )
                                    }else if(index === pController.data.length - 1 && breakLoop){
                                        return (
                                            <React.Fragment>
                                                <ProjectControllerList
                                                    greenHouseId={this.props.greenHouseId}
                                                    projectId={e.projectId}  
                                                    data={[]}
                                                    buttonCreate={this.props.buttonCreate} 
                                                    buttonDelete={this.props.buttonDelete}
                                                    buttonEdit={this.props.buttonEdit}/>
                                                <hr/>
                                            </React.Fragment>                                               
                                        )
                                    }
                                })}
                            </Grid>
                        )
                    })}
            </Grid> 
        )
    }

}

function mapStateToProps({application}) {
    return {
        projects: application.controllerReducers.projects,
        pController: application.controllerReducers.pController,

    }
}

export default connect(mapStateToProps)(ProjectTabs)
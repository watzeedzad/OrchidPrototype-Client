import React, { Component } from 'react';
import { getProject,getProjectController } from 'store/actions/application/controllerActions'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap';
import ProjectControllerList from './ProjectControllerList'
import 'bootstrap/dist/css/bootstrap.min.css';

class ProjectTabs extends Component {

    componentDidMount() {
        this.props.dispatch(getProject({greenHouseId: this.props.greenHouseId }))
        this.props.dispatch(getProjectController({ greenHouseId: this.props.greenHouseId }))   
    }

    render() {
        const { projects,pController } = this.props

        if (projects.isRejected) {
            return <div className="alert alert-danger">Error: {projects.data}</div>
        }
        if (pController.isRejected) {
            return <div className="alert alert-danger">Error: {pController.data}</div>
        }
        if (projects.isLoading || pController.isLoading) {
            return <div>Loading...</div>
        }
        if (projects.data.errorMessage){
            return <div className="alert alert-danger">{projects.data.errorMessage}</div>
        }

        return (
            <Container>
                <div>
                <h5>รายชื่อคอนโทรลเลอร์ที่อยู่ในเเต่ละโปรเจ็ค</h5>
                    <Row>
                        {projects.data && projects.data.map(e => {
                            let breakLoop = true; 
                            return (
                                <Col xs='12' sm='12' md='12' lg='12' xl='12'>
                                    projectId : {e.projectId}
                                    {pController.data.errorMessage
                                    ? <div className="alert alert-danger">{pController.data.errorMessage}</div>
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
                                                    <br/><hr/>
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
                                                    <br/><hr/>
                                                </React.Fragment>                                               
                                            )
                                        }
                                    })}
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            </Container>
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
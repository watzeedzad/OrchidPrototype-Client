import React, { Component } from 'react';
import { getProject } from 'store/actions/application/controllerActions'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap';
import ProjectControllerList from './ProjectControllerList'
import 'bootstrap/dist/css/bootstrap.min.css';

class ProjectTabs extends Component {

    componentDidMount() {
        this.props.dispatch(getProject({
            greenHouseId: this.props.greenHouseId }))
    }

    render() {
        const { projects } = this.props

        if (projects.isRejected) {
            return <div className="alert alert-danger">Error: {projects.data}</div>
        }
        if (projects.isLoading) {
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
                            return (
                                <Col xs='12' sm='12' md='12' lg='12' xl='12'>
                                    projectId : {e.projectId}
                                    <ProjectControllerList 
                                        greenHouseId={this.props.greenHouseId}
                                        projectId={e.projectId}
                                        buttonCreate={this.props.buttonCreate} 
                                        buttonDelete={this.props.buttonDelete}
                                        buttonEdit={this.props.buttonEdit}/>
                                    <br/><hr/>
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
    }
}

export default connect(mapStateToProps)(ProjectTabs)
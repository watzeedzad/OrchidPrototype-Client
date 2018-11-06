import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import ProjectList from '../components/Project/ProjectList'

const styles = theme => ({
    root: {
        width: '100%'
    },
    layoutRoot: {}
});

function Project(props){  
      
        return (
            <ProjectList/>
        )
    
}

export default withStyles(styles, { withTheme: true })(Project)
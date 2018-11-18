import {FuseLoadable} from '@fuse';

export const PageConfig = {
    settings: {
        layout: {
            config: {
                navbar        : {
                    display: true
                },
                toolbar       : {
                    display: true
                },
                footer        : {
                    display: false
                },
                leftSidePanel : {
                    display: false
                },
                rightSidePanel: {
                    display: false
                }
            }
        }   
    },
    adminSettings: {
        layout: {
            config: {
                navbar        : {
                    display: false
                },
                toolbar       : {
                    display: true
                },
                footer        : {
                    display: false
                },
                leftSidePanel : {
                    display: false
                },
                rightSidePanel: {
                    display: false
                }
            }
        }   
    },
    routes  : [
        {
            path     : '/weatherControl',
            component: FuseLoadable({
                loader: () => import('./WeatherControl')
            })
        },
        {
            path     : '/userManagement',
            component: FuseLoadable({
                loader: () => import('./UserManagement')
            })
            
        },
        {
            path     : '/controllerManagement',
            component: FuseLoadable({
                loader: () => import('./ControllerManagement')
            })
            
        },
        {
            path     : '/planterAnalyze',
            component: FuseLoadable({
                loader: () => import('./PlanterAnalyze')
            })
            
        },
        {
            path     : '/fertilityControl',
            component: FuseLoadable({
                loader: () => import('./FertilityControl')
            })
            
        },
        {
            path     : '/waterControl',
            component: FuseLoadable({
                loader: () => import('./WaterControl')
            })
            
        },
        {
            path     : '/fertilizerControl',
            component: FuseLoadable({
                loader: () => import('./FertilizerControl')
            })
            
        },
        {
            path     : '/lightControl',
            component: FuseLoadable({
                loader: () => import('./LightControl')
            })
            
        },
        {
            path     : '/monitoring',
            component: FuseLoadable({
                loader: () => import('./Monitoring')
            })
            
        },
        {
            path     : '/greenHouse',
            component: FuseLoadable({
                loader: () => import('./GreenHouse')
            })
            
        },
        {
            path     : '/project',
            component: FuseLoadable({
                loader: () => import('./Project')
            })
            
        },
        {
            path     : '/farm',
            component: FuseLoadable({
                loader: () => import('./Farm')
            })
            
        }
    ]
};

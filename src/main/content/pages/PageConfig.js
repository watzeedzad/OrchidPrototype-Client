import {FuseLoadable} from '@fuse';

export const PageConfig = {
    settings: {
        layout: {}
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
            
        }
    ]
};

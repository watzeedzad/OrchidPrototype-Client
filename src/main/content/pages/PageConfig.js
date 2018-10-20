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
            
        }
    ]
};

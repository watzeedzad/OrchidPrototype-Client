import {FuseLoadable} from '@fuse';
import UserManagement from './UserManagement'

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

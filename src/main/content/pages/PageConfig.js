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
            path     : '/login',
            component: FuseLoadable({
                loader: () => import('./Login')
            })
        }
    ]
};

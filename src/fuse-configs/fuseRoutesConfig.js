import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {PageConfig} from 'main/content/pages/PageConfig'
import {LoginConfig} from 'main/content/pages/LoginConfig'

const routeConfigs = [
    PageConfig,
    LoginConfig
];

export const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/login"/>
    },
    {
        component: () => <Redirect to="/error-404"/>
    }
];

import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {ExampleConfig} from 'main/content/example/ExampleConfig';
import {PageConfig} from 'main/content/pages/PageConfig'
import {LoginConfig} from 'main/content/pages/LoginConfig'

const routeConfigs = [
    ExampleConfig,
    PageConfig,
    LoginConfig
];

export const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/login"/>
    }
];

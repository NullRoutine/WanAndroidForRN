/**
 * @format
 */
import React from 'react'
import {AppRegistry, YellowBox} from 'react-native'
import {name as appName} from './app.json';
import dva from './app/utils/dva'
import Router, {routerMiddleware, routerReducer} from './app/router'
import appModel from './app/models/app'
import homeModel from './app/models/home'
import knowledgeModel from './app/models/knowledge'
import logger from 'redux-logger'
import './app/theme.js';
import {Toast} from '@ant-design/react-native';

YellowBox.ignoreWarnings(['Warning: ', 'Module RCTImageLoader', 'Class RCTCxxModule',]);

const app = dva({
    initialState: {},
    models: [appModel, homeModel, knowledgeModel],
    extraReducers: {router: routerReducer},
    // onAction: [routerMiddleware],
    onAction: logger,
    onError(err) {
        console.log('onError======dva>', err)
        Toast.offline(err.ERR_MSG, 3, null, false)
    }
})

const App = app.start(<Router/>);

AppRegistry.registerComponent(appName, () => App)

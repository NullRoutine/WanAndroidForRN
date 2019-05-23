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
// import {Toast} from 'antd-mobile-rn'
YellowBox.ignoreWarnings(['Warning: ', 'Module RCTImageLoader', 'Class RCTCxxModule',]);

const app = dva({
    initialState: {},
    models: [appModel, homeModel, knowledgeModel],
    extraReducers: {router: routerReducer},
    // onAction: [routerMiddleware],
    onAction: logger,
    onError(err) {
        log('onError======dva>', err)
        // Toast.offline(e.ERR_MSG, 3, null, false)
    },
})

const App = app.start(<Router/>);

AppRegistry.registerComponent(appName, () => App)

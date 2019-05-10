/**
 * @format
 */
import React from 'react'
import {AppRegistry} from 'react-native'
import {name as appName} from './app.json';
import dva from './app/utils/dva'
import Router, {routerMiddleware, routerReducer} from './app/router'
import appModel from './app/models/app'
import homeModel from './app/models/home'
import logger from 'redux-logger'
import './app/theme.js';

const app = dva({
    initialState: {},
    models: [appModel, homeModel],
    extraReducers: {router: routerReducer},
    // onAction: [routerMiddleware],
    onAction: logger,
    onError(e) {
       log('onError', e)
    },
})

const App = app.start(<Router/>);

AppRegistry.registerComponent(appName, () => App)

import React, {PureComponent} from 'react'
import {BackHandler, Animated, Easing, Platform} from 'react-native'
import {
    createStackNavigator,
    createBottomTabNavigator,
    NavigationActions,
    TabNavigator
} from 'react-navigation'
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware,
    createNavigationReducer,
} from 'react-navigation-redux-helpers'
import {connect} from 'react-redux'

import Loading from './containers/Loading'
import Login from './containers/Login'
import Home from './containers/Home'
import Account from './containers/Account'
import Detail from './containers/Detail'
import ArticleDetail from './containers/ArticleDetail'
import Knowledge from './containers/Knowledge'
import ProjectList from './containers/ProjectList'

//设置标题栏高度以及padding
let headerHeight = Platform.OS === 'ios' ? 43.5 : 56
let statusPadding = Platform.OS === 'ios' ? 20 : 0

if (Platform.Version >= 21) {
    statusPadding = 25
} else if (Platform.Version >= 25) {
    statusPadding = 24
}

const HomeNavigator = createBottomTabNavigator({
    Home: {screen: Home},
    Knowledge: {screen: Knowledge},
    Account: {screen: Account}
}, {
    tabBarOptions: {
        activeTintColor: '#00abff',
        labelStyle: {
            fontSize: 12,
        }
    }
});

HomeNavigator.navigationOptions = ({navigation}) => {
    const {routeName} = navigation.state.routes[navigation.state.index]

    return {
        headerTitle: routeName,
        header: null,
    }
}
//主路由
const MainNavigator = createStackNavigator(
    {
        HomeNavigator: {screen: HomeNavigator},
        Detail: {screen: Detail},
    },
    {
        headerMode: 'none',
        navigationOptions: {
            gesturesEnabled: false,
            headerStyle: {
                backgroundColor: '#f4511e',
            }
        }
    }
)

const AppNavigator = createStackNavigator(
    {
        Main: {
            screen: MainNavigator,
            headerMode: 'none',
            navigationOptions: {
                header: null
            }
        },
        Login: {
            screen: Login,
            headerMode: 'none',
        },
        ArticleDetail: {
            screen: ArticleDetail,
        },
        ProjectList: {
            screen: ProjectList,
        }
    },
    {
        headerMode: 'float',
        mode: 'modal',
        navigationOptions: {
            gesturesEnabled: false,
            backgroundColor: '#00abff',
            headerStyle: {//头部样式
                backgroundColor: '#00abff',
                // height: headerHeight + statusPadding,
                // paddingTop: statusPadding,
                elevation: 0,
                shadowOpacity: 0,
            },
            headerTitleStyle: {
                color: '#ffffff'
            },
            headerTintColor: '#ffffff',
        },
        transitionConfig: () => ({
            transitionSpec: {
                duration: 300,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const {layout, position, scene} = sceneProps
                const {index} = scene

                const height = layout.initHeight
                const translateY = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [height, 0, 0],
                })

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1],
                })

                return {opacity, transform: [{translateY}]}
            },
        }),
    }
)

export const routerReducer = createNavigationReducer(AppNavigator)

export const routerMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.router
)

const App = reduxifyNavigator(AppNavigator, 'root')

function getActiveRouteName(navigationState) {
    if (!navigationState) {
        return null
    }
    const route = navigationState.routes[navigationState.index]
    if (route.routes) {
        return getActiveRouteName(route)
    }
    return route.routeName
}

@connect(({app, router}) => ({app, router}))
class Router extends PureComponent {
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backHandle)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
    }

    backHandle = () => {
        const currentScreen = getActiveRouteName(this.props.router)
        if (currentScreen === 'Login') {
            return true
        }
        if (currentScreen !== 'Home') {
            this.props.dispatch(NavigationActions.back())
            return true
        }
        return false
    }

    render() {
        const {app, dispatch, router} = this.props
        if (app.loading) return <Loading/>

        return <App dispatch={dispatch} state={router}/>
    }
}

export default Router

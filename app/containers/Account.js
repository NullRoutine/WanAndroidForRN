/**
 * 个人中心
 */
import React, {Component} from 'react'
import {StyleSheet, View, Image} from 'react-native'
import {connect} from 'react-redux'

import {Button} from '../components'

import {createAction, NavigationActions} from '../utils'

@connect(({app}) => ({...app}))
class Account extends Component {
    static navigationOptions = {
        tabBarLabel: '我的',
        tabBarIcon: ({focused, tintColor}) => {
            if (focused) {
                return (<Image
                    style={[styles.icon]}
                    source={require('../images/tabbar/about_select.png')}
                />)
            } else {
                return (<Image
                    style={[styles.icon]}
                    source={require('../images/tabbar/about.png')}
                />)
            }
        },

    }

    gotoLogin = () => {
        this.props.dispatch(NavigationActions.navigate({routeName: 'Login'}))
    }

    logout = () => {
        this.props.dispatch(createAction('app/logout')())
    }

    render() {
        const {login} = this.props
        return (
            <View style={styles.container}>
                {login ? (
                    <Button text="Logout" onPress={this.logout}/>
                ) : (
                    <Button text="Goto Login" onPress={this.gotoLogin}/>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 25,
        height: 25,
    },
})

export default Account

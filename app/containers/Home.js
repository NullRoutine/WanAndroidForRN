import React, {Component} from 'react'
import {StyleSheet, View, Image} from 'react-native'
import {connect} from 'react-redux'

import {Button} from '../components'

import {NavigationActions, createAction} from '../utils'

@connect()
class Home extends Component {
    static navigationOptions = {
        tabBarLabel: '首页',
        tabBarIcon: ({focused, tintColor}) => {
            if (focused) {
                return (   <Image
                    style={[styles.icon]}
                    source={require('../images/tabbar/home_select.png')}
                />)
            } else {
                return (   <Image
                    style={[styles.icon]}
                    source={require('../images/tabbar/home.png')}
                />)
            }
        },
    }

    gotoDetail = () => {
        this.props.dispatch(NavigationActions.navigate({routeName: 'Detail'}))
    }

    componentDidMount() {
        this.props.dispatch(createAction('home/getHomeList')({
            pageNum: 0
        }))
    }

    render() {
        return (
            <View style={styles.container}>
                <Button text="Goto Detail" onPress={this.gotoDetail}/>
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

export default Home

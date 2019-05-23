import React, {Component} from 'react'
import {StyleSheet, View, FlatList, Text, RefreshControl, TouchableNativeFeedback} from 'react-native'
import {connect} from 'react-redux'

import {Button} from '../components'

import {NavigationActions} from '../utils'

@connect()
class Detail extends Component {
    static navigationOptions = {
        title: 'Detail',
    }

    goBack = () => {
        this.props.dispatch(NavigationActions.back({routeName: 'Account'}))
    }
    _queryList = () => {

    }

    _getData = () => {
        return [
            {name: "lxd"}, {name: "xxx"}
        ]
    };
    //返回itemView
    _renderItemView({item}) {
        return (
            <TouchableNativeFeedback>
                <View >
                    <Text style={styles.content}>时间: </Text>
                    <Text style={styles.content}>作者:</Text>
                </View>
            </TouchableNativeFeedback >
        );
    }
    render() {
        return (
            <FlatList
                data={this._getData()}
                renderItem={this._renderItemView}
                ListFooterComponent={<Text>tou</Text>}
                onEndReachedThreshold={0.1}
                keyExtractor={(item, index) => index}
            />)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        marginBottom:8,
        marginLeft:8,
        marginRight:8,
        fontSize: 14,
        color: 'black',
    }
})

export default Detail

/**
 * 项目列表
 * Created by tang.wangqiang on 2019/5/17.
 */
import React, {Component} from 'react'
import {StyleSheet} from 'react-native'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import {connect} from 'react-redux'
import ProjectItemListView from './ProjectItemListView'

@connect()
export default class ProjectList extends Component {

    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.name}`
    });

    render() {
        return (<ScrollableTabView
            locked={false}
            tabBarBackgroundColor={appTheme.themeColor}
            tabBarUnderlineStyle={{backgroundColor: 'white'}}
            tabBarActiveTextColor='#fff'
            renderTabBar={() => <ScrollableTabBar/>}
            tabBarInactiveTextColor='#fff'>
            {this.props.navigation.state.params.children.map((item, index) => <ProjectItemListView
                navigation={this.props.navigation} tabLabel={item.name} item={item} key={index}/>)}
        </ScrollableTabView>)
    }
}
const styles = StyleSheet.create({})
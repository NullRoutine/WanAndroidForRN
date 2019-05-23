/**
 * 单个项目列表
 * Created by tang.wangqiang on 2019/5/20.
 */
import React, {Component} from 'react'
import {FlatList, View, Text, TouchableNativeFeedback, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {NavigationActions, createAction} from '../utils'


@connect(({loading}) => {
    log('======>loading',loading)
    return {
        loading: loading.global
    }
})
export default class ProjectItemListView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            page: 0,
            projectList: [],
            cid: props.item.id
        }
    }

    componentDidMount() {
        this._queryList();
    }

    /**
     * 列表
     * @private
     */
    _queryList = () => {

        this.setState({page: 0})
        this.props.dispatch(createAction('knowledge/getProjectList')({
            pageNum: 0,
            id: this.state.cid,
            callback: (list) => {
                this.setState({
                    projectList: [...list]
                })
            }
        }))
    }
    _onEndReached = () => {
        log('触发加载更多')
        if(!this.canAction) return;
        let page = this.state.page
        page++;
        this.setState({page: page})
        this.props.dispatch(createAction('knowledge/getProjectList')({
            pageNum: page,
            id: this.state.cid,
            callback: (list) => {
                let oldData = this.state.projectList
                let newData = [...oldData, ...list]
                this.setState({
                    projectList: newData
                })
            }
        }))
    }

    render() {
        return (<View style={{height: '100%'}}>
            <FlatList data={this.state.projectList}
                      refreshing={this.props.loading}
                      renderItem={this._renderItemView}
                      onRefresh={this._queryList}
                      onEndReachedThreshold={0.1}
                      onEndReached={this._onEndReached}
                      onScrollBeginDrag={() => {
                          console.log('onScrollBeginDrag');
                          this.canAction = true;
                      }}
                      onScrollEndDrag={() => {
                          console.log('onScrollEndDrag');
                          this.canAction = false;
                      }}
                      onMomentumScrollBegin={() => {
                          console.log('onMomentumScrollBegin');
                          this.canAction = true;
                      }}
                      onMomentumScrollEnd={() => {
                          console.log('onMomentumScrollEnd');
                          this.canAction = false;
                      }}
                      keyExtractor={(item, index) => index.toString()}
            />
        </View>)
    }

    _renderItemView = ({item}) => {
        return (<TouchableNativeFeedback onPress={() => {
            this.props.dispatch(NavigationActions.navigate({routeName: "ArticleDetail", params: {...item}}))
        }}>
            <View style={styles.content}>
                <Text style={{marginTop: 4, fontSize: 16, color: appTheme.color_333}}>{item.title}</Text>
                <View style={styles.top}>
                    <Text>作者:&nbsp;{item.author}&nbsp;&nbsp;时间:{item.niceDate}</Text>
                </View>
            </View>
        </TouchableNativeFeedback>)
    }
}
const styles = StyleSheet.create({
    content: {
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column',
        marginLeft: 8,
        marginRight: 8,
        marginTop: 4,
        marginBottom: 4,
        padding: 8,
        borderRadius: 5,
        //以下是阴影属性：
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#bfbfbf',
        //注意：这一句是可以让安卓拥有灰色阴影
        elevation: 2,
    },

})
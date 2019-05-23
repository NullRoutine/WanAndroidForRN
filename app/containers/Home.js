import React, {Component} from 'react'
import {StyleSheet, View, Image, FlatList, Text, TouchableNativeFeedback, RefreshControl} from 'react-native'
import {connect} from 'react-redux'

import {NavigationActions, createAction} from '../utils'
import BannerView from "./BannerView";


@connect(({home, loading}) => {
    return ({
        articleList: home.articleList,
        bannerList: home.bannerList,
        loading: loading.global
    })
})
class Home extends Component {
    static navigationOptions = {
        tabBarLabel: '首页',
        tabBarIcon: ({focused, tintColor}) => {
            if (focused) {
                return (<Image
                    style={[styles.icon]}
                    source={require('../images/tabbar/home_select.png')}
                />)
            } else {
                return (<Image
                    style={[styles.icon]}
                    source={require('../images/tabbar/home.png')}
                />)
            }
        },
    }

    constructor(props) {
        super(props)
        this.state = {
            page: 0
        }
    }

    gotoDetail = () => {
        this.props.dispatch(NavigationActions.navigate({routeName: 'Detail'}))
    }

    componentDidMount() {
        this._queryList();
        this._bannerList();
    }

    /**
     * 列表
     * @private
     */
    _queryList = () => {
        this.setState({page: 0})
        this.props.dispatch(createAction('home/getHomeList')({
            pageNum: 0
        }))
    }

    _bannerList = () => {
        this.props.dispatch(createAction('home/getBanner')())
    }
    _onEndReached = () => {
        if (!this.props.isEnd) {
            let page = this.state.page
            page++;
            this.setState({page: page})
            this.props.dispatch(createAction('home/getHomeList')({
                pageNum: page
            }))
        }
    }

    render() {
        const {navigation} = this.props
        return (<FlatList data={this.props.articleList}
                          // refreshing={this.props.loading}
                          renderItem={this._renderItemView}
                          // onRefresh={this._queryList}
                          refreshControl={
                              <RefreshControl
                                  refreshing={this.props.loading}
                                  onRefresh={this._queryList}
                                  tintColor="red"
                                  colors={["red","green"]}
                              />
                          }
                          ListHeaderComponent={() => <BannerView navigation={navigation}
                                                                 banners={this.props.bannerList}/>}
                          onEndReachedThreshold={0.2}
                          onEndReached={this._onEndReached}
                          keyExtractor={(item, index) => index.toString()}
        />)
    }

    //返回itemView
    _renderItemView = ({item}) => {
        return (
            <TouchableNativeFeedback onPress={() => {
                this.props.dispatch(NavigationActions.navigate({routeName: "ArticleDetail", params: {...item}}))
            }}>
                <View style={styles.content}>
                    <View style={styles.top}>
                        <Text style={{
                            fontSize: 14,
                            color: "#999999"
                        }}>{item.author}</Text>
                    </View>
                    <Text style={{marginTop: 4, fontSize: 16, color: appTheme.color_333}}>{item.title}</Text>
                    <View style={styles.top}>
                        <Text>分类:&nbsp;{item.chapterName}&nbsp;&nbsp;{item.niceDate}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
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
    top: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 4
    }
})

export default Home

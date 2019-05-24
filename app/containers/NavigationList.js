/**
 * Created by tang.wangqiang on 2019/5/23.
 */
import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions} from 'react-native'
import {connect} from 'react-redux'
import {NavigationActions, createAction} from '../utils'

const height = Dimensions.get('window').height

@connect(({knowledge, loading}) => {
    return ({
        navList: knowledge.navList,
        loading: loading.global
    })
})
class NavigationList extends Component {
    static navigationOptions = {
        tabBarLabel: '导航',
        tabBarIcon: ({focused, tintColor}) => {
            if (focused) {
                return (<Image
                    style={[styles.icon]}
                    source={require('../images/tabbar/navigation_select.png')}
                />)
            } else {
                return (<Image
                    style={[styles.icon]}
                    source={require('../images/tabbar/navigation.png')}
                />)
            }
        },
    }

    constructor(props) {
        super(props)
        this._sectionList = null
        this.state = {
            selectedRootCate: 0,//默认选中位置
            navList: []
        }
    }

    componentDidMount() {
        this.props.dispatch(createAction('knowledge/getNavList')())
    }

    render() {
        const {navList} = this.props
        return (<View style={styles.content}>
                <View style={styles.leftStyle}>
                    <ScrollView ref={(ref) => this._sectionList = ref}>
                        {this._renderLeft(this.props.navList)}
                    </ScrollView>
                </View>
                <View style={styles.rightStyle}>
                    <ScrollView>
                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                        }}>
                            {this._renderRight(this.props.navList.length > 0 ? this.props.navList[this.state.selectedRootCate] : {})}
                        </View>
                    </ScrollView>
                </View>


            </View>
        )
    }

    _renderRight(list) {
        log('list', list)
        if (list && list.articles && list.articles.length) {
            return (list.articles.map((item, index) => {
                return ( <TouchableOpacity
                        key={index}
                        style={{
                            alignItems: 'center',
                            marginLeft: 8,
                            justifyContent: 'center', height: 48
                        }}
                        onPress={() => {
                            this.props.dispatch(NavigationActions.navigate({routeName: "ArticleDetail", params: {...item}}))
                        }}
                    >
                        <Text style={{
                            fontSize: 16,
                            padding: 4,
                            borderColor: '#bfbfbf',
                            borderRadius: 3,
                            borderWidth: 1,
                            color: appTheme.color_333
                        }}>{item.title}</Text>
                    </TouchableOpacity>
                )
            }))
        }

    }

    _renderLeft(list) {
        return (list.map((item, index) => {
            return ( <TouchableOpacity
                    key={index}
                    style={[{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 48
                    }, this.state.selectedRootCate === index ? {
                        backgroundColor: '#F5F5F5',
                        borderLeftWidth: 3,
                        borderLeftColor: appTheme.themeColor
                    } : {backgroundColor: 'white'}]}
                    onPress={() => {
                        log('height=>', height)
                        // let position = parseInt(height / 48)
                        let position = 7
                        if (index <= position) {
                            this._sectionList.scrollTo({x: 0, y: 0, animated: true})
                        } else {
                            this._sectionList.scrollTo({
                                x: 0,
                                y: 48 * (index - position),
                                animated: true
                            })
                        }
                        this.setState({selectedRootCate: index})
                    }}
                >
                    <Text style={{
                        fontSize: 16,
                        color: this.state.selectedRootCate === index ? appTheme.themeColor : appTheme.color_333
                    }}>{item.name}</Text>
                </TouchableOpacity>
            )
        }))

    }
}

export default NavigationList
const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    leftStyle: {
        flex: 1,
        backgroundColor: 'white'
    },
    rightStyle: {
        flex: 3
    },
    icon: {
        width: 25,
        height: 25,
    },
})

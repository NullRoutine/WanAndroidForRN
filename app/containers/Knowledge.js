/**
 * 知识体系
 * Created by tang.wangqiang on 2019/5/16.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Image, View, StyleSheet, FlatList, Text, TouchableNativeFeedback} from 'react-native'
import {NavigationActions, createAction} from '../utils'

@connect(({knowledge, loading}) => {
    return ({
        knowledgeList: knowledge.knowledgeList,
        loading: loading.global
    })
})
class Knowledge extends Component {
    static navigationOptions = {
        tabBarLabel: '知识体系',
        tabBarIcon: ({focused, tintColor}) => {
            if (focused) {
                return (<Image
                    style={[styles.icon]}
                    source={require('../images/tabbar/knowledge_select.png')}
                />)
            } else {
                return (<Image
                    style={[styles.icon]}
                    source={require('../images/tabbar/knowledge.png')}
                />)
            }
        },
    }

    componentDidMount() {
        this.props.dispatch(createAction('knowledge/getKnowledgeList')())
    }

    _queryList = () => {
        this.props.dispatch(createAction('knowledge/getKnowledgeList')())
    }

    render() {
        return (<FlatList data={this.props.knowledgeList}
                          refreshing={this.props.loading}
                          renderItem={this._renderItemView}
                          onRefresh={this._queryList}
                          onEndReachedThreshold={0.1}
                          keyExtractor={(item, index) => index.toString()}
        />)
    }

    _renderItemView = ({item}) => {
        return (<TouchableNativeFeedback onPress={() => {
            this.props.dispatch(NavigationActions.navigate({routeName: "ProjectList", params: {...item}}))
        }}>
            <View style={styles.itemWarpper}>
                <View style={styles.textWarpper}>
                    <Text style={styles.itemText}>{item.name}</Text>
                    <View style={styles.childrenWarpper}>
                        {item.children.map((item, index) => this._renderChildrenView(item, index))}
                    </View>
                </View>
                {/*<Icon style={styles.icon} name='ios-arrow-forward' size={20} color='grey'/>*/}
            </View>
        </TouchableNativeFeedback>)
    }
    _renderChildrenView = (item, index) => (
        <Text key={item.id} style={styles.childrenText}>{item.name}</Text>
    )
}

const styles = StyleSheet.create({
    itemWarpper: {
        margin: 8,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 5,
        shadowColor: 'black',
        shadowRadius: 5,
        flexDirection: 'row',
    },
    textWarpper: {
        flex: 1,
    },
    childrenWarpper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginHorizontal: 8,
        color: 'grey',
        marginTop: 8,

    },
    childrenText: {
        marginLeft: 8,
        marginVertical: 8,
        fontSize: 12,
    },
    icon: {
        width: 25,
        height: 25,
    },

});
export default Knowledge
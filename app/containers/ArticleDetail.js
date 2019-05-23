/**
 * 文章详情WebView
 * Created by tang.wangqiang on 2019/5/16.
 */
import React, {Component} from 'react'
import {View, WebView, StyleSheet} from 'react-native'

class ArticleDetail extends Component {

    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.title}`
    });

    render() {
        log(this.props.navigation.state.params)
        const {link, url, name, collect} = this.props.navigation.state.params
        return (<View style={{flex: 1}}>
            <WebView
                automaticallyAdjustContentInsets={false}
                style={styles.webView}
                source={{uri: link ? link : url}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                decelerationRate="normal"
                startInLoadingState={true}
                scalesPageToFit={true}
            />
        </View>)
    }
}

const styles = StyleSheet.create({
    webView: {
        flex: 1
    }
})
export default ArticleDetail
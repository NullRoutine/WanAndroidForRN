/**
 * 轮播图
 * Created by tang.wangqiang on 2019/5/15.
 */
import React, {PureComponent} from 'react'
import {TouchableNativeFeedback, View, Image, Text, Dimensions, StyleSheet} from 'react-native'
import Swiper from 'react-native-swiper'
import PropTypes from "prop-types"
import {connect} from 'react-redux'

const BannerWidth = Dimensions.get("window").width
const BannerHeight = 260

@connect()
class BannerView extends PureComponent {

    static PropTypes = {
        banners: PropTypes.array.isRequired,
        navigation: PropTypes.object.isRequired,
    }

    _renderPage(image, index) {
        const {navigation, themeColor} = this.props
        return (
            <TouchableNativeFeedback
                onPress={() => {
                    this.props.dispatch(navigation.navigate({routeName: "ArticleDetail", params: {...image}}))
                }}
                key={index}>
                <View style={{borderRadius: 5}}>
                    <Image style={{width: BannerWidth - 16, height: 220, borderRadius: 5}}
                           source={{uri: image.imagePath}}/>
                    {/*<View style={styles.textWarpper}>*/}
                    {/*<Text style={styles.text}>{image.title}</Text>*/}
                    {/*</View>*/}
                </View>
            </TouchableNativeFeedback>
        )
    }

    render() {
        const {banners, themeColor} = this.props
        return (<View style={{margin: 8, borderRadius: 5}}>
            <Swiper height={220}
                    autoplay={true}
                    autoplayTimeout={3}>
                {banners[0] ? banners.map((image, index) => this._renderPage(image, index)) : <View/>}
            </Swiper>
        </View>)
    }
}

const styles = StyleSheet.create({
    textWarpper: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: BannerHeight,
        width: BannerWidth - 16,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    text: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 25,
        color: 'white'
    }
})
export default BannerView
import {
    Platform,
    Dimensions,
    DeviceInfo
} from 'react-native'

const {width, height} = Dimensions.get('window');

const fontScale =()=>1.0/DeviceInfo.Dimensions.screen.fontScale;

global.appTheme = {

    /*App主题颜色 默认主题颜色*/
    themeColor:"#268BE8",

    /*字体大小 App 默认大小 */
    fontSize_12: 12*fontScale,
    fontSize_13: 13*fontScale,
    fontSize_14: 14*fontScale,
    fontSize_15: 15*fontScale,
    fontSize_16: 16*fontScale,
    fontSize_17: 17*fontScale,
    fontSize_18: 18*fontScale,
    fontSize_19: 19*fontScale,
    fontSize_20: 20*fontScale,
    fontSize_27: 27*fontScale,
    /*字体的颜色*/
    fontColor_333: '#333333',
    fontColor_FFF:'#FFFFFF',

    /*圆角大小*/
    radius_20: 20,

    color_FFA93F:'#FFA93F',

    color_999:'#999999',
    color_333:'#333333',
    color_7CB9F1:'#7CB9F1',

    borderColor:"#dddddd",
    /*背景颜色  默认背景颜色*/
    backgroundColor_999: '#999',
    backgroundColor_FFF: '#FFF',
    backgroundColor_EEE: '#EEEEEE',
    backgroundColor_default:'#EEEEEE',
    backgroundColor_149DB1:'#149DB1',
    backgroundColor_19BBB1:'#19BBB1',


    /*屏幕大小*/
    height_full: height,
    width_full: width,

};

global.log = (TAG,info) => {
    if (__DEV__) {
        if (TAG&&info){
            console.log("["+TAG+"]",info);
        }else {
            console.log(TAG);
        }
    }
};

global.addAction = (key, callback) => {
    if (!this.globalActionArray) {
        this.globalActionArray = [];
    }
    this.globalActionArray[key] = callback;
};

global.getAction = (key) => {
    if (this.globalActionArray) {
        return this.globalActionArray[key];
    } else {
        return;
    }
};

global.removeAction = (key) => {
    if (this.globalActionArray[key]) {
        delete this.globalActionArray[key];
    }
};
global.addActionMap = (key, callback) => {
    if (!this.globalActionMap) {
        this.globalActionMap = new Map();
    }
    if (this.globalActionMap.has(key)) {
        this.globalActionMap.get(key).push(callback)
    } else {
        this.globalActionMap.set(key, [callback])
    }
};
global.getActionMap = (key) => {
    if (this.globalActionMap && this.globalActionMap.has(key)) {
        return this.globalActionMap.get(key);
    } else {
        return null;
    }
};

global.removeActionMap = (key) => {
    if (this.globalActionMap && this.globalActionMap.has(key)) {
        this.globalActionMap.set(key, [])
    }
};
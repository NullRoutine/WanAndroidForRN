/**
 * Created by tang.wangqiang on 2019/5/6.
 */
//请求地址
const base_url = 'https://www.wanandroid.com'
// 超时时间
const MAX_WAITING_TIME = 10000

function getFormData(params) {
    let formData = new FormData();
    for (let key in params) {
        if (!params.hasOwnProperty(key)) continue;
        formData.append(key, params[key])
    }
    return formData
}


function request(method, url, params = '', timeOut) {
    let request_url = base_url + url
    if (url.startsWith('http://') || url.startsWith('https://')) {
        request_url = url
    } else {
        request_url = base_url + url
    }
    log('url', request_url)
    let config = {
        method: method
    }
    if (params !== '') {
        config['body'] = getFormData(params)
    }
    config['headers'] = {}
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject({ERR_MSG: '请求超时,请重试。', ERR_CODE: '401'})
        }, timeOut || MAX_WAITING_TIME)
        fetch(request_url, config)
            .then(res => {
                return res.json()
            })
            .then(json => {
                console.log('请求成功', json)
                if (json.errorCode === -1) {
                    reject(json.ERR_MSG)
                } else {
                    resolve(json)
                }
                clearTimeout(timeout)
            })
            .catch(err => {
                reject({ERR_MSG: '网络连接错误，请检查您的网络连接或稍后再试。', ERR_CODE: '400'})
            })
    })
}

export default class HttpUtil {
    static get(url, params = '') {
        return request('GET', url, params)
    }

    static post(url, params = '') {
        return request('POST', url, params)
    }
}
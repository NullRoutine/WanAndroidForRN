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
    console.log(request_url)
    let config = {
        method: method
    }
    if (params !== '') {
        config['body'] = getFormData(params)
    }
    config['headers'] = {}
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject({ERR_MSG: '请求超时,请重试。', ERR_CODE: '400'})
        }, timeOut || MAX_WAITING_TIME)
        fetch(request_url, config)
        .then(res => {
            // if ((res.url.indexOf('user/login')!=-1 || res.url.indexOf('user/register'))!=-1 && res.headers.map.hasOwnProperty('set-cookie')) {
            //     const cookie = res.headers.map['set-cookie'][0]
            //     RealmUtil.saveCookie(cookie)
            // }
            return res.json()
        })
            .then(json => {
                log('请求成功', json)
                if (json.errorCode === -1) {
                    reject(json.errorMsg)
                } else {
                    resolve(json)
                    clearTimeout(timeout)
                }
            })
            .catch(err => {
                console.log('请求错误', err)
                reject(err)
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
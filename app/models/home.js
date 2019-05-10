/**
 * Created by tang.wangqiang on 2019/5/6.
 */
import {homeList} from '../services/service'

export default {
    namespace: 'home',
    state: {},
    reducers: {},
    effects: {
        /**
         *首页
         * @param payload
         * @param call
         * @param put
         * 变量声明不能相同
         */* getHomeList({payload}, {call, put}) {
            console.log(homeList)
            const list = yield call(homeList, {payload})
            if (list) {
                if (!!payload.callback) {
                    yield payload.callback(list)
                }
            }
        }
    }

}
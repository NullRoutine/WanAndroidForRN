/**
 * 首页
 * Created by tang.wangqiang on 2019/5/6.
 */
import * as service from '../services/service'
import {createAction} from '../utils/index'

export default {
    namespace: 'home',
    state: {
        isSuccess: true,
        isEnd: false,
        articleList: [],
        bannerList: []
    },
    //更新数据
    reducers: {
        updateState(state, {payload}) {
            return {...state, ...payload}
        },
    },
    effects: {
        /**
         *首页
         * @param payload
         * @param call
         * @param put
         * 变量声明不能相同
         * @param select
         */* getHomeList({payload}, {call, put, select}) {
                const list = yield call(service.homeList, {payload})
                if (payload.pageNum === 0) { //刷新
                    yield put(createAction('updateState')({
                        articleList: list.data.datas, isSuccess: true
                    }))
                } else {
                    const listTemp = yield select(state => state.home.articleList)
                    yield put(createAction('updateState')({
                        articleList: [...listTemp, ...list.data.datas], isSuccess: true
                    }))
                }
        },
        /**
         * 首页轮播图
         * @param payload
         * @param call
         * @param put
         * @param select
         */* getBanner({payload}, {call, put, select}) {
            const list = yield call(service.bannerList)
            if (list) {
                yield put(createAction('updateState')({
                    bannerList: list.data
                }))
            }
        }
    }

}
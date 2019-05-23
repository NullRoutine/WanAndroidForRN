/**
 * 知识体系
 * Created by tang.wangqiang on 2019/5/16.
 */
import * as service from '../services/service'
import {createAction} from '../utils/index'

export default {
    namespace: 'knowledge',
    state: {
        knowledgeList: []
    },
    //更新数据
    reducers: {
        updateState(state, {payload}) {
            return {...state, ...payload}
        },
    },
    effects: {
        * getKnowledgeList({payload}, {call, put, select}) {
            const list = yield call(service.knowLedgeList, {payload})
            yield put(createAction('updateState')({
                knowledgeList: list.data
            }))
        },
        * getProjectList({payload}, {call, put, select}) {
            const list = yield call(service.ProjectDetailList, {payload})
                if (!!payload.callback) {
                    yield payload.callback(list.data.datas)
                }
        }
    }

}
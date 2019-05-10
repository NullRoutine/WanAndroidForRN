/**
 * Created by tang.wangqiang on 2019/5/7.
 */
import HttpUtil from '../common/AppClient'

export const homeList = async ({payload}) => {
    const {pageNum} = payload;
    console.log(payload)
    return HttpUtil.get('/article/list/' + pageNum + '/json')
    // return true
}
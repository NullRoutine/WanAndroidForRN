/**
 * Created by tang.wangqiang on 2019/5/7.
 */
import HttpUtil from '../common/AppClient'

/**
 * 首页列表
 * @param payload
 * @returns {Promise.<*>}
 */
export const homeList = async ({payload}) => {
    const {pageNum} = payload;
    return HttpUtil.get('/article/list/' + pageNum + '/json')
}
/**
 * 首页轮播图
 * @returns {Promise.<*>}
 */
export const bannerList = async () => {
    return HttpUtil.get('/banner/json')
}
/**
 * 知识体系
 * @returns {Promise.<*>}
 */
export const knowLedgeList = async () => {
    return HttpUtil.get('/tree/json')
}
/**
 * 知识体系具体项目列表
 * @param payload
 * @returns {Promise.<*>}
 * @constructor
 */
export const ProjectDetailList = async ({payload}) => {
    const {id, pageNum} = payload;
    return HttpUtil.get('/article/list/' + pageNum + '/json?cid=' + id)
}

import _ from 'lodash';
interface RouterCacheObject {
    key: string;
    tabTitle: string;
    path: string;
    index: number;
}

interface StateFace {
    routerCacheArray: Array<RouterCacheObject>;
    routerCacheKeyArray: Array<string>;
    activeTabKey: string;
}

const state: StateFace = {
    routerCacheArray: [],
    routerCacheKeyArray: [],
    activeTabKey: 'dashboard'
}
/**
 * getters相当于是state的计算属性，如果你需要将变量的值进行计算，然后输出，写这里
 */
const getters = {
    routerCacheData(state: StateFace) {
        return state.routerCacheArray
    },
    routerCacheKeyData(state: StateFace) {
        return state.routerCacheKeyArray
    }
}

const mutations = {
    /**
     * 添加路由缓存
     */
    ADD_ROUTER_CACHE: (state: StateFace, cache: RouterCacheObject) => {
        const isHas = _.indexOf(state.routerCacheKeyArray, cache['key'])
        if (isHas === -1) {
            state.routerCacheArray.push(cache)
            state.routerCacheKeyArray.push(cache['key'])
        }
    },

    /**
     * 清除路由缓存
     */
    CLEAR_ROUTER_CACHE: (state: StateFace, index: number) => {
        _.pullAt(state.routerCacheArray, index)
        const temp = _.clone(state.routerCacheArray)
        state.routerCacheArray = temp;
        _.pullAt(state.routerCacheKeyArray, index)
        const keyTemp = _.clone(state.routerCacheKeyArray)
        state.routerCacheKeyArray = keyTemp;
    },

    /**
     * 设置当前活跃tab
     */
    SET_ACTIVE_TAB_KEY: (state: StateFace, key: string) => {
        state.activeTabKey = key;
    },
}

const actions = {
    addrouterCache(commit: any, cache: RouterCacheObject) {
        commit('ADD_ROUTER_CACHE', cache)
    },
    claearRouterCache(commit: any, index: number) {
        commit('CLEAR_ROUTER_CACHE', index)
    },
    clearErrorLog(commit: any) {
        commit('CLEAR_ROUTER_CACHE')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}

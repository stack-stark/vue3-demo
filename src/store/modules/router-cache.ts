import _ from 'lodash';
interface RouterCacheObject {
    key: string;
    name: string;
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
    activeTabKey: 'index'
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

/**
 * 设置当前显示的tab key
 */
const setActiveKey = () => {
    if (state.routerCacheArray.length > 0) {
        state.activeTabKey = state.routerCacheArray[length - 1]['key'];
    } else {
        state.activeTabKey = 'index';
    }
}

const mutations = {
    ADD_ROUTER_CACHE: (state: StateFace, cache: RouterCacheObject) => {
        state.routerCacheArray.push(cache)
        state.routerCacheKeyArray.push(cache['key'])
    },
    CLEAR_ROUTER_CACHE: (state: StateFace, index: number) => {
        _.pullAt(state.routerCacheArray, index)
        const temp = _.clone(state.routerCacheArray)
        state.routerCacheArray = temp;
        _.pullAt(state.routerCacheKeyArray, index)
        const keyTemp = _.clone(state.routerCacheKeyArray)
        state.routerCacheKeyArray = keyTemp;
        setActiveKey;
    },
    SET_ACTIVE_TAB_KEY: (state: StateFace, key: string) => {
        state.activeTabKey = key;
    },
}

const actions = {
    addrouterCache(commit: any, cache: RouterCacheObject) {
        commit('ADD_ROUTER_CACHE', cache)
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

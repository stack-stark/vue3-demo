import { ActionTree, Action } from 'vuex'

interface RouterCacheObject {
    key: string;
    name: string;
    path: string;
    index: number;
}

interface StateFace {
    routerCacheArray: Array<RouterCacheObject>;
}

const state: StateFace = {
    routerCacheArray: []
}

const mutations = {
    ADD_ROUTER_CACHE: (state: StateFace, cache: RouterCacheObject ) => {
        state.routerCacheArray.push(cache)
    },
    CLEAR_ROUTER_CACHE: (state: StateFace, index: number) => {
        state.routerCacheArray.splice(index)
    }
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
    actions
}

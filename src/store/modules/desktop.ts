
interface StateFace {
    collapsed: boolean;
}

const state: StateFace = {
    collapsed: false
}
/**
 * getters相当于是state的计算属性，如果你需要将变量的值进行计算，然后输出，写这里
 */
const getters = {                
    collapsedStstue(state: StateFace) {
        return state.collapsed
    }
}

const mutations = {
    SET_COLLAPSED_STATUS: (state: StateFace, ststus: boolean) => {
        state.collapsed = ststus;
    }
}

const actions = {
    setCollapsedStatus(commit: any, ststus: boolean) {
        commit('SET_COLLAPSED_STATUS', ststus);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}

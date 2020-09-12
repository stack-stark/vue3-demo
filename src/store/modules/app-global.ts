
interface StateFace {
    loading: boolean;
}

const state: StateFace = {
    loading: false
}

const mutations = {
    SET_LOADING_STATUS: (state: StateFace, ststus: boolean) => {
        state.loading = ststus;
    }
}

const actions = {
    setCollapsedStatus(commit: any, ststus: boolean) {
        commit('SET_LOADING_STATUS', ststus);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

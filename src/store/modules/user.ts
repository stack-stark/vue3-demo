
interface StateFace {
    token: string | null;
}

const state: StateFace = {
    token: localStorage.getItem('token') || null
}

const getters = {                
    getToken(state: StateFace) {
        return state.token
    }
}

const mutations = {
    SET_TOKEN: (state: StateFace, token: string) => {
        state.token = token;
    },
    REMOVE_TOKEN: (state: StateFace) => {
        state.token = null;
    }
}

const actions = {
    setToken(commit: any, token: string) {
        commit('SET_TOKEN', token);
    },
    removeToken(commit: any) {
        commit('REMOVE_TOKEN');
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

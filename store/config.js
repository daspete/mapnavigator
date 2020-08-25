export const state = () => {
    return {
        config: {}
    }
}

export const mutations = {
    SetConfig(state, config){
        state.config = config
    }
}

export const getters = {
    Config(state){
        return state.config
    }
}

export const actions = {

}
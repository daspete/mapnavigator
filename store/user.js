export const state = () => {
    return {
        user: {}
    }
}

export const mutations = {
    SetUser(state, user){
        state.user = user
    }
}

export const getters = {
    User(state){
        return state.user
    }
}

export const actions = {

}
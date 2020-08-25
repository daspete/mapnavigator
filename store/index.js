export const actions = {
    async nuxtServerInit({ commit }, { app }){
        console.log('SERVER INIT')
    },

    nuxtClientInit({ commit }, context){
        console.log('CLIENT INIT')
    }
}
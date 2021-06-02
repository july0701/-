export default {
    state: {
        kyesTerms: null,//搜索关键词
    },
    mutations: {
        getTerms(state, keys) {
            state.kyesTerms = keys
        },
        
    }
}
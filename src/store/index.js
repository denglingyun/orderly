import Vue from 'vue'
import Vuex from 'vuex'
import dictionaries from './modules/dictionaries'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        pageTitle: '',
        exit:''
    },
    mutations: {
        setPageTitle: (state, data) => {
            state.pageTitle = data;
        },
        setExit: (state, data) => {
            state.exit = data;
        },
    },
    actions: {

    },
    modules: {
        dictionaries
    },
})

export default store

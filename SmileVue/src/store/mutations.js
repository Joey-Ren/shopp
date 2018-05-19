import {SHOW_LOADING,HIDE_LOADING} from './types'
import getters from './getters'
import Vue from 'vue'

const state = {
    isLoading :false
}

const mutations = {
    [SHOW_LOADING](state,msg){
            console.log(state,'show_state');
            console.log(msg,'show_msg');
            state.isLoading = msg
    },
    [HIDE_LOADING](state,msg){
        console.log(state,'hide_state');
        console.log(msg,'hide_msg');
        state.isLoading = msg

    }
}

export default {
    state,
    mutations,
    getters
}
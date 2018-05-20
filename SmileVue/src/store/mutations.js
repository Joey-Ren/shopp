import {
  SHOW_LOADING,
  HIDE_LOADING
} from './types'
import getters from './getters'
import Vue from 'vue'
import state from './state'

const mutations = {
  [SHOW_LOADING](state, msg) {
    state.isLoading = msg
  },
  [HIDE_LOADING](state, msg) {

    state.isLoading = msg

  }
}

export default {
  state,
  mutations,
  getters
}

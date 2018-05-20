import * as types from './types'

export default {
    showLoading:({commit},message)=>{
            commit(types.SHOW_LOADING,message)
    },
    hideLoading:({commit},message)=>{
       
        commit(types.HIDE_LOADING,message)
    }
}

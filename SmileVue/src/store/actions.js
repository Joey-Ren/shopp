import * as types from './types'

export default {
    showLoading:({commit},message)=>{
            console.log(commit,'show_commit');
            console.log(message,'show_message');
            commit(types.SHOW_LOADING,message)
    },
    hideLoading:({commit},message)=>{
        console.log(commit,'hide_commit');
        console.log(message,'hide_message');
        commit(types.HIDE_LOADING,message)
    }
}

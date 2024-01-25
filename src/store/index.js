//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

//准备actions对象——响应组件中用户的动作
const actions = {
    setName(context,value){
		context.commit('SETNAME',value)
	}
}
//准备mutations对象——修改state中的数据
const mutations = {
    SETNAME(state,value){
        state.name = value;
    },
    ADDNUM(state,value){
        state.name = value;
    }
}
//准备state对象——保存具体的数据
const state = {
    name: 'nothing' //当前的和
}

const getters = {
    LoginName(state){
        return state.name;
    }
}

const countAbout = {
    namespaced:true,
    //开启命名空间，模块化
}

//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state,
    getters
})

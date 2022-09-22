import { createStore } from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

const initialState = () => {
  return { user: '', error: '' }
}

export default createStore({
  state: initialState(),
  mutations: mutations,
  actions: actions,
  getters: getters
})

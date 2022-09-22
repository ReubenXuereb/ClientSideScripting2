
const getters = {
  getUser (state) {
    return state.user
  },
  isUserAuth (state) {
    return !!state.user
  },
  getError (state) {
    return state.error
  },
  getAdminStatus (state) {
    return state.isAdmin
  }
}

export default getters

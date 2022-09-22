import firebase from 'firebase/app'

const actions = {
  authAction ({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        commit('setUser', user)
        // this.getUserData(user.uid)
        console.log(user.uid)
      } else {
        commit('setUser', null)
      }
    })
  }
}

export default actions

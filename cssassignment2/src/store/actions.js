import firebase from 'firebase/app'

const actions = {
  authAction ({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        commit('setUser', user)
        // this.getUserData(user.uid)
      } else {
        commit('setUser', null)
      }
    })
  },
  authUser () {
    const user = firebase.auth().currentUser
    if (user != null) {
      user.providerData.forEach(function (profile) {
        console.log('Sign-in provider: ' + profile.providerId)
        console.log('  Provider-specific UID: ' + profile.uid)
        console.log('  Name: ' + profile.displayName)
        console.log('  Email: ' + profile.email)
        console.log('  Photo URL: ' + profile.photoURL)
      })
    }
  },
  setAdmin ({ commit }, payload) {
    commit('setAdmin', payload.isAdmin)
  }
}

export default actions

<template>
  <div class="vue-template">
    <!-- Navigation -->
    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
      <div class="container">
        <img
          src="https://vuejs.org/images/logo.png"
          style="height: 50px; margin: 20px;"
        />
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item" v-if="!isUserAuth">
            <router-link class="btn btn-outline-primary" :to="{ name: 'Login'}">Sign in</router-link>
          </li>
          <li class="nav-item" v-if="!isUserAuth">
            <router-link class="btn btn-outline-primary" :to="{ name: 'Register'}">Sign up</router-link>
          </li>
          <button v-if="isUserAuth" class="btn btn-outline-primary" @click="home" >Home Page</button>
          <button v-if="isUserAuth" class="btn btn-outline-primary" @click="viewMembers" >View Member</button>
          <button v-if="isUserAuth" class="btn btn-outline-primary" @click="addCar" >Add Car</button>
          <button v-if="isUserAuth" class="btn btn-outline-primary" @click="signOut" >Log Out</button>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase'

export default {
  computed: {
    ...mapGetters(['getUser', 'isUserAuth'])
  },
  methods: {
    signOut () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('Successfully logged out')
          this.$router.push('/login')
          this.$store.dispatch('setUser', null)
          console.log('Logged Out')
        })
        .catch(error => {
          alert(error.message)
          console.log(error('Error signing out'))
          this.$store.dispatch('setError', error.message)
        })
    },
    addCar () {
      /* const user = firebase.auth().currentUser
      if (user != null) {
        console.log(' Provider-specific UID: ' + user.uid) */
      const userUID = firebase.auth().currentUser.uid
      console.log(userUID)
      this.$router.push('/addCar/' + userUID)
    },
    viewMembers () {
      const userUID = firebase.auth().currentUser.uid
      console.log(userUID)
      this.$router.push('/viewMembers/' + userUID)
    },
    home () {
      const userUID = firebase.auth().currentUser.uid
      console.log(userUID)
      this.$router.push('/home/' + userUID)
    }
    /* const memId = user
      console.log('uid is: ' + memId)
      */
  }
}
</script>

<style scoped>

</style>

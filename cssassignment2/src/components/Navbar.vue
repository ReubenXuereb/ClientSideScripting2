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
          <div class="nav-item" v-if="isUserAuth">
          <li>
            <router-link v-if="isAdmin" class="btn btn-outline-primary" :to="{ name: 'ViewAll'}">View All Members</router-link>
          </li>
          </div>
          <div v-if="isUserAuth">
            <button v-if="isAdmin" class="btn btn-outline-primary" @click="updateMember" >Update Member</button>
          <button class="btn btn-outline-primary" @click="home" >Home Page</button>
          <button class="btn btn-outline-primary" @click="viewMember" >View Member</button>
          <button class="btn btn-outline-primary" @click="addCar" >Add Car</button>
          <button class="btn btn-outline-primary" @click="signOut" >Log Out</button>
          </div>
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
    ...mapGetters(['getUser', 'isUserAuth', 'getAdminStatus']),
    isAdmin () {
      if (this.getAdminStatus !== null) {
        return this.getAdminStatus
      } else {
        return false
      }
    }
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
      const userUID = firebase.auth().currentUser.uid
      console.log(userUID)
      this.$router.push('/addCar/' + userUID)
    },
    viewMember () {
      const userUID = firebase.auth().currentUser.uid
      console.log(userUID)
      this.$router.push('/viewMember/' + userUID)
    },
    home () {
      const userUID = firebase.auth().currentUser.uid
      console.log(userUID)
      this.$router.push('/home/' + userUID)
    },
    updateMember () {
      const userUID = firebase.auth().currentUser.uid
      console.log(userUID)
      this.$router.push('/updateMember/' + userUID)
    }
  }
}

</script>

<style scoped>

</style>

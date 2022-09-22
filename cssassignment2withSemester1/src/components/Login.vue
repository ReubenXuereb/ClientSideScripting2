<template>
    <div class="vue-template" v-if="!isUserAuth">
      <form @click.prevent="signIn">
        <h3>Sign In</h3>
        <div class="form-group">
          <label>Email address</label>
          <input type="email" class="form-control form-control-lg" v-model.trim="user.email" />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control form-control-lg" v-model.trim="user.password" />
        </div>

        <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
      </form>
    </div>
</template>

<script>
import { required, minLength, email } from '@vuelidate/validators'
import { mapGetters } from 'vuex'
import firebase from 'firebase'

export default {
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  validations () {
    return {
      email: { required, email },
      password: { required, minLength: minLength(3) }
    }
  },
  computed: {
    ...mapGetters(['isUserAuth'])
  },
  methods: {
    // ...mapActions(['signInAction']),
    signIn () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
          alert('Welcome back ' + this.user.email)
          const userUID = firebase.auth().currentUser.uid
          console.log(userUID)
          this.$router.push('/home/' + userUID)
          console.log('Signed In')
        })
        .catch(error => {
          // alert(error.message)
          console.log(error.message)
        })
    }
  }
}
</script>

<style scoped>

</style>

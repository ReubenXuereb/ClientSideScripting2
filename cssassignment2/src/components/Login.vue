<template>
    <div class="vue-template" v-if="!isUserAuth">
      <form>
        <h3>Sign In</h3>
        <div class="form-group">
          <label>Email</label>
          <input type="email" @blur="v$.email.$touch" name="email" class="form-control form-control-lg" v-model.trim="email" />
          <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password" @blur="v$.password.$touch" name="password" class="form-control form-control-lg" v-model.trim="password" />
          <div class="input-errors" v-for="error of v$.password.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <button @click.prevent="timerData" type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
      </form>
    </div>
</template>

<script>
import { required, minLength, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { mapGetters, mapActions } from 'vuex'
import firebase from 'firebase'

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      email: '',
      password: '',
      isAdmin: false
    }
  },
  validations () {
    return {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },
  computed: {
    ...mapGetters(['isUserAuth'])
  },
  methods: {
    ...mapActions(['setAdmin']),
    signIn () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          const userUID = firebase.auth().currentUser.uid
          console.log(userUID)
          this.$router.push('/home/' + userUID)
          console.log('Signed In')
        })
        .catch(error => {
          // alert(error.message)
          console.log(error.message)
          alert(error.message)
        })
    },
    async getData () {
      console.log('Getting data')
      const id = firebase.auth().currentUser.uid
      console.log(id)
      try {
        const response = await fetch('https://cssassignment2-e31a9-default-rtdb.europe-west1.firebasedatabase.app/contact/' + id + '.json', {
          method: 'GET'
        })
        const responseData = await response.json()
        if (!response.ok) {
          console.log('Something went wrong')
        }
        this.setAdmin({
          isAdmin:
          responseData.isAdmin
        })
        console.log(responseData.isAdmin)
      } catch (error) {
        console.log(error)
      }
    },
    timerData () {
      this.signIn()
      setTimeout(() => {
        this.getData()
      }, 1000)
    }
  }
}
</script>

<style scoped>

</style>

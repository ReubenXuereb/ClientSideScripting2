<template>
  <div class="vue-template" v-if="!isUserAuth">
    <form>
      <h3>Sign Up</h3>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" @blur="v$.user.name.$touch" id="name" name="name" class="form-control form-control-lg" v-model="user.name" />
        <div class="input-errors" v-for="error of v$.user.name.$errors" :key="error.$uid">
          <div class="text-danger">{{ error.$message }}</div>
         </div>
        </div>
      <div class="form-group">
        <label>Surname</label>
        <input type="text" @blur="v$.user.surname.$touch" name="surname" class="form-control form-control-lg" v-model.trim="user.surname" />
        <div class="input-errors" v-for="error of v$.user.surname.$errors" :key="error.$uid">
          <div class="text-danger">{{ error.$message }}</div>
        </div>
      </div>
      <div class="form-group">
        <label>Mobile</label>
        <input type="tel" @blur="v$.user.mobile.$touch" name="mobile" class="form-control form-control-lg" v-model.trim="user.mobile" />
        <div class="input-errors" v-for="error of v$.user.mobile.$errors" :key="error.$uid">
          <div class="text-danger">{{ error.$message }}</div>
        </div>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" @blur="v$.user.email.$touch" name="email" class="form-control form-control-lg" v-model.trim="user.email" />
        <div class="input-errors" v-for="error of v$.user.email.$errors" :key="error.$uid">
          <div class="text-danger">{{ error.$message }}</div>
        </div>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" @blur="v$.user.password.$touch" name="password" class="form-control form-control-lg" v-model.trim="user.password" />
        <div class="input-errors" v-for="error of v$.user.password.$errors" :key="error.$uid">
          <div class="text-danger">{{ error.$message }}</div>
        </div>
      </div>
      <div class="form-group">
        <label>Confirm Password</label>
        <input type="password" @blur="v$.user.confPass.$touch" class="form-control form-control-lg" v-model.trim="user.confPass" />
        <div class="input-errors" v-for="error of v$.user.confPass.$errors" :key="error.$uid">
          <div class="text-danger">{{ error.$message }}</div>
        </div>
      </div>
      <button @click.prevent="signUp" type="submit" class="btn btn-dark btn-lg btn-block">
        Sign Up
      </button>
      <button @click="back" type="submit" class="btn btn-dark btn-lg btn-block">
        Back
      </button>
      <p class="forgot-password text-right">
        Already registered
        <router-link :to="{name: 'Login'}">sign in?</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength, alpha, numeric, sameAs } from '@vuelidate/validators'
import { mapGetters } from 'vuex'
import firebase from 'firebase'

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      user: {
        name: '',
        surname: '',
        mobile: '',
        email: '',
        password: '',
        confPass: '',
        isAdmin: false
      }
    }
  },
  computed: {
    ...mapGetters(['isUserAuth', 'getUser'])
  },
  validations () {
    return {
      user: {
        name: {
          required,
          minLength: minLength(4),
          maxLength: maxLength(15),
          alpha
        },
        surname: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(15),
          alpha
        },
        mobile: {
          required,
          minLength: minLength(8),
          maxLength: maxLength(8),
          numeric
        },
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(6)
        },
        confPass: {
          required,
          sameAsPass: sameAs(this.user.password)
        }
      }
    }
  },
  methods: {
    // ...mapActions(['signUpAction']),
    async signUp () {
      const userAuth = await firebase
        .auth()
        .createUserWithEmailAndPassword(this.user.email, this.user.password)
      const user = {
        name: this.user.name,
        surname: this.user.surname,
        mobile: this.user.mobile,
        password: this.user.password,
        email: userAuth.user.email,
        uid: userAuth.user.uid,
        isAdmin: false
      }
      await firebase
        .database()
        .ref('contact/' + user.uid)
        .set(user)
      // alert('Sign Up was Successful, Welcome ' + this.user.name + '.')
        .catch(error => {
          console.log(error.message)
          alert(error.message)
        })
        .then(() => {
          alert('Sign Up was Successful, Welcome ' + this.user.name + '.')
          const userUID = firebase.auth().currentUser.uid
          console.log(userUID)
          this.$router.push('/home/' + userUID)
        })
    },
    /* .then((res) => {
          alert('Sign Up was Successful, Welcome ' + this.user.name + '.')
          res.user
            .updateProfile({
              displayName: this.user.name
            })
            .then(() => {
              this.$router.push('/home')
              console.log('Signe Up Success !')
            })
        })
        .catch(error => {
          alert(error.message)
        })
      console.log('Getting data')
      const response = await fetch('https://cssassignment2-e31a9-default-rtdb.europe-west1.firebasedatabase.app/contact/' + user.uid + '.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            uid: this.uid + 1,
            name: this.user.name,
            surname: this.user.surname,
            mobile: this.user.mobile,
            email: this.user.email,
            password: this.user.password
          }
        })
      })
      if (!response.ok) {
        console.log('Something went wrong')
      } */
    back () {
      this.$router.back()
      console.log('worked')
    }
  }
}

</script>

<style scoped>

</style>

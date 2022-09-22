<template>
  <div class="vue-template" v-if="isUserAuth">
    <form>
      <h3>Update Member</h3>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" @blur="v$.name.$touch" id="name" name="name" class="form-control form-control-lg" v-model="name" />
        <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
          <div class="text-danger">{{ error.$message }}</div>
        </div>
      </div>

      <div class="form-group">
        <label>Surname</label>
        <input type="text" @blur="v$.surname.$touch" name="surname" class="form-control form-control-lg" v-model.trim="surname" />
        <div class="input-errors" v-for="error of v$.surname.$errors" :key="error.$uid">
          <div class="text-danger">{{ error.$message }}</div>
        </div>
      </div>

      <div class="form-group">
        <label>Mobile</label>
        <input type="tel" @blur="v$.mobile.$touch" name="mobile" class="form-control form-control-lg" v-model.trim="mobile" />
        <div class="input-errors" v-for="error of v$.mobile.$errors" :key="error.$uid">
          <div class="text-danger">{{ error.$message }}</div>
        </div>
      </div>

      <button @click.prevent="UpdateMember" type="submit" class="btn btn-dark btn-lg btn-block">Update Member</button>
    </form>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import firebase from 'firebase'
import { alpha, maxLength, minLength, numeric, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      name: '',
      surname: '',
      mobile: ''
    }
  },
  computed: {
    ...mapGetters(['isUserAuth', 'getUser'])
  },
  validations () {
    return {
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
      }
    }
  },
  methods: {
    async UpdateMember () {
      console.log('updating...')
      const response = await fetch('https://cssassignment2-e31a9-default-rtdb.europe-west1.firebasedatabase.app/contact/' + this.$route.params.uID + '.json', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.name,
          surname: this.surname,
          mobile: this.mobile
        })
      })
      alert('Member Updated')
      const userUID = firebase.auth().currentUser.uid
      await this.$router.push('/home/' + userUID)
      if (!response.ok) {
        console.log('Something went wrong')
      }
    },
    async getData () {
      console.log('Getting data')
      try {
        const response = await fetch('https://cssassignment2-e31a9-default-rtdb.europe-west1.firebasedatabase.app/contact/' + this.$route.params.uID + '.json', {
          method: 'GET'
        })
        const responseData = await response.json()
        if (!response.ok) {
          console.log('Something went wrong')
        }
        this.name = responseData.name
        this.surname = responseData.surname
        this.mobile = responseData.mobile
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped>

</style>

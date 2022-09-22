<template>
  <div class="vue-template" v-if="isUserAuth">
    <div class="form-group">
      <label>Brand</label>
      <input type="text" class="form-control form-control-lg" v-model.trim="user.brand" />
    </div>
    <div class="form-group">
      <label>Model</label>
      <input type="text" class="form-control form-control-lg" v-model.trim="user.model" />
    </div>
    <div class="form-group">
      <label>Year of Manufacture</label>
      <input type="text" class="form-control form-control-lg" v-model.trim="user.yom" />
    </div>
    <p>{{getUserUid()}}</p>
    <button @submit.prevent="addVehicle" type="submit" class="btn btn-dark btn-lg btn-block">Add Vehicle</button>
  <button @click="back" type="submit" class="btn btn-dark btn-lg btn-block">
    Back
  </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase'

export default {
  data () {
    return {
      user: {
        brand: '',
        model: '',
        yom: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getUser', 'isUserAuth'])
  },
  methods: {
    back () {
      this.$router.back()
      console.log('is working')
    },
    getUserUid () {
      const user = firebase.auth().currentUser
      if (user != null) {
        user.providerData.forEach(function (profile) {
          // console.log(' Provider-specific UID: ' + user.uid)
        })
      }
    },
    async addVehicle () {
      const response = await fetch('https://cssassignment2-e31a9-default-rtdb.europe-west1.firebasedatabase.app/contact/.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            brand: this.user.brand,
            model: this.user.model,
            yom: this.user.yom
          }
        })
      })
      if (!response.ok) {
        console.log('Something went wrong')
      }
    }
  }
}

</script>

<style scoped>

</style>

<template>
  <div class="vue-template" v-if="isUserAuth">
    <form>
      <h3>Add Vehicle</h3>
      <div class="form-group">
        <label>Brand</label>
        <input type="text" @blur="v$.brand.$touch" class="form-control form-control-lg" v-model.trim="brand" />
        <div class="input-errors" v-for="error of v$.brand.$errors" :key="error.$uid">
          <div class="text-danger">{{ error.$message }}</div>
        </div>
      </div>

      <div class="form-group">
        <label>Model</label>
        <input type="text" @blur="v$.model.$touch" class="form-control form-control-lg" v-model.trim="model" />
        <div class="input-errors" v-for="error of v$.model.$errors" :key="error.$uid">
          <div class="text-danger">{{ error.$message }}</div>
        </div>
      </div>

      <div class="form-group">
        <label>Year</label>
        <input type="text" @blur="v$.yom.$touch" class="form-control form-control-lg" v-model.trim="yom" />
        <div class="input-errors" v-for="error of v$.yom.$errors" :key="error.$uid">
          <div class="text-danger">{{ error.$message }}</div>
        </div>
      </div>

      <button @click.prevent="timerData()" type="submit" class="btn btn-dark btn-lg btn-block">Add Vehicle</button>
    </form>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import firebase from 'firebase'
import { alpha, maxLength, minLength, required, numeric } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import axios from 'axios'

export default {
  inject: ['GStore'],
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      brand: '',
      model: '',
      yom: '',
      url: '',
      updateMode: false
    }
  },
  computed: {
    ...mapGetters(['isUserAuth', 'getUser'])
  },
  validations () {
    return {
      brand: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(15),
        alpha
      },
      model: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(15)
      },
      yom: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(4),
        numeric
      }
    }
  },
  methods: {
    async addCar () {
      const response = await fetch('https://cssassignment2-e31a9-default-rtdb.europe-west1.firebasedatabase.app/contact/' + this.$route.params.uID + '/Cars/.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          brand: this.brand,
          model: this.model,
          yom: this.yom,
          url: this.url
        })
      })
      this.GStore.flashMessage = 'Vehicle was added'
      alert('Vehicle Added')
      const userUID = firebase.auth().currentUser.uid
      await this.$router.push('/home/' + userUID)
      if (!response.ok) {
        console.log('Something went wrong')
      }
      this.getAPIData()
    },
    // API Call
    getAPIData () {
      /* var indexBrand
      var indexModel */
      const search = this.brand + ' ' + this.model
      console.log(search)
      const options = {
        method: 'GET',
        url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI',
        params: {
          q: search,
          pageNumber: '1',
          pageSize: '10',
          autoCorrect: 'true'
        },
        headers: {
          'x-rapidapi-key': '3a18fbe587msh2a99c5a49ed3ad8p1098ffjsnb9a6d962ace6',
          'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
        }
      }
      axios.request(options).then(response => {
        var index
        for (index = 0; index < response.data.value.length; index++) {
          if (response.status === 404 || response.status === 403 || response.status === 401 || response.status === 520) {
            index++
            this.url = response.data.value[index].url
          } else {
            this.url = response.data.value[index].url
            console.log(response.data)
            console.log(response.data.value[index].url)
            console.log('im always showing up')
            break
          }
          console.log(response.status)
        }
        // this.urlPath = response.data.value[0].url
      }).catch(function (error) {
        alert(error)
        console.error(error)
      })
    },
    timerData () {
      this.getAPIData()
      setTimeout(() => {
        this.addCar()
      }, 4000)
    }
  /*  addCar2 () {
      this.retrieveData()
      setTimeout(() => {
        this.Cars.push(this.brand)
        this.Cars.push(this.model)
        this.Cars.push(this.yom)
        firebase
          .database()
          .ref('contact/' + this.$route.params.uID)
          .update({
            Cars: [{
              brand: this.brand,
              model: this.model,
              yom: this.yom
            }]
          })
      }, 1000)
    },
    retrieveData () {
      var userCars = firebase.database().ref('contact/' + this.$route.params.uID)
      userCars.once('value', (snapshot) => {
        const dataCar = snapshot.val()
        if (dataCar.Cars !== undefined) {
          this.Cars = dataCar.Cars
        }
      })
    } */
  }
}
</script>

<style scoped>

</style>

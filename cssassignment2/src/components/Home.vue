<template >
<div class="vue-template" v-if="isUserAuth">
    <section>
      <table  class="table table-bordered" >
        <thead>
        <tr>
        <th> Name: {{name.toUpperCase()}}</th>
        </tr>
        </thead>
        <thead>
        <tr>
          <th>Brand</th>
          <th>Model</th>
          <th>Year</th>
          <th>Car Image</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in results" :key="user.uid">
          <td>{{user.brand}}</td>
          <td>{{user.model}}</td>
          <td>{{user.yom}}</td>
         <td> <img :src="user.url" style="height: 50px; margin: 10px;"/></td>
          <td>
            <button @click.prevent="deleteCar(user)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </section>
  <p>{{showData ()}}</p>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase'

export default {
  data () {
    return {
      name: '',
      brand: '',
      model: '',
      yom: '',
      url: '',
      results: []
    }
  },
  created () {
  },
  computed: {
    ...mapGetters(['getUser', 'isUserAuth'])
  },
  methods: {
    getUserData (uid) {
      firebase.database().ref('contact/' + uid)
        .once('value', snap => {
          console.log(snap.val())
        })
    },
    showData () {
      firebase
        .auth()
        .onAuthStateChanged(user => {
          if (user) {
            this.getUserData(user.uid)
          }
        })
    },
    // getting user name
    async getNameData () {
      console.log('Getting data')
      const uid = this.$route.params.uID
      console.log(uid)
      try {
        const response = await fetch('https://cssassignment2-e31a9-default-rtdb.europe-west1.firebasedatabase.app/contact/' + uid + '.json', {
          method: 'GET'
        })
        const responseData = await response.json()
        if (!response.ok) {
          console.log('Something went wrong')
        }
        this.name = responseData.name
      } catch (error) {
        console.log(error)
      }
    },
    // getting user car data
    async showUserCars () {
      console.log('getting cars')
      try {
        const uid = this.$route.params.uID
        const response = await fetch('https://cssassignment2-e31a9-default-rtdb.europe-west1.firebasedatabase.app/contact/' + uid + '/Cars/.json', {
          method: 'GET'
        })
        const responseData = await response.json()
        if (!response.ok) {
          console.log('Something went wrong')
        }
        const results = []
        for (const id in responseData) {
          results.push({
            id: id,
            brand: responseData[id].brand,
            model: responseData[id].model,
            yom: responseData[id].yom,
            url: responseData[id].url
          })
          this.results = results
          console.log(results)
        }
      } catch (error) {
        console.log(error)
      }
    },
    deleteCar (memberCar) {
      const userUID = firebase.auth().currentUser.uid
      const carUID = memberCar.id
      const fullUID = firebase.auth().currentUser.uid + '/Cars/' + memberCar.id
      console.log(userUID)
      console.log(carUID)
      console.log(fullUID)
      this.$router.push('/deleteCar/' + fullUID)
    }
  },
  mounted () {
    this.getNameData()
    this.showUserCars()
  }
  /* mounted () {
    this.displayData()
  } */
}
// <img src='' height='4744' width='3163' />
</script>

<style scoped>

</style>

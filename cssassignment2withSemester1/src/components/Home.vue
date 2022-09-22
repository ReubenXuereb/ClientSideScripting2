<template >
<div class="vue-template" v-if="isUserAuth">
  <transition name="view">
    <section>
      <table  class="table table-bordered" >
        <tr>
          <th>Name:</th>
          <td>{{name}}</td>
        </tr>
      </table>
      <button @click="back" type="button" class="btn btn-secondary">Back</button>
    </section>
  </transition>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase'

export default {
  data () {
    return {
      name: ''
    }
  },
  computed: {
    ...mapGetters(['getUser', 'isUserAuth'])
  },
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
      } else {
        this.user = null
      }
    })
  },
  methods: {
    async getData () {
      console.log('Getting data')
      const id = this.$route.params.uID
      console.log(id)
      try {
        const response = await fetch('https://cssassignment2-e31a9-default-rtdb.europe-west1.firebasedatabase.app/contact/' + id + '.json', {
          method: 'GET'
        })
        const responseData = await response.json()
        if (!response.ok) {
          console.log('Something went wrong')
        }

        this.name = responseData.name.toUpperCase()
      } catch (error) {
        console.log(error)
      }
    },
    back () {
      this.$router.back()
    }
    /* displayData (uid) {
      const userRef = firebase.database().ref('contact/' + uid)
      this.Users = []
      userRef.once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const data = childSnapshot.val()
          this.Users.push({
            key: data.user.uid,
            name: data.user.name
          })
        })
      })
    } */
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped>

</style>

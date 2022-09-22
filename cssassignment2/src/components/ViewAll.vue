<template>
  <div class="vue-template" v-if="isUserAuth">
    <div class="row">
      <div class="col-md-12">
        <table class="table table-striped">
          <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in results" :key="user.uid">
            <td>{{user.name}}</td>
            <td>{{user.surname}}</td>
            <td>{{user.email}}</td>
            <td>
              <button @click.prevent="deleteUser(user)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      results: []
    }
  },
  computed: {
    ...mapGetters(['getUser', 'isUserAuth'])
  },
  methods: {
    async getData () {
      console.log('Getting data')
      try {
        const response = await fetch('https://cssassignment2-e31a9-default-rtdb.europe-west1.firebasedatabase.app/contact/.json', {
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
            name: responseData[id].name,
            surname: responseData[id].surname,
            email: responseData[id].email
          })
          this.results = results
        }
      } catch (error) {
        console.log(error)
      }
    },
    deleteUser (member) {
      const userUID = member.id
      console.log(userUID)
      this.$router.push('/deleteMember/' + userUID)
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped>

</style>

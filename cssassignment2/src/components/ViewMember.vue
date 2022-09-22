<template v-if="isUserAuth">
  <transition name="view">
    <section>
      <table  class="table table-bordered" >

        <thead class="thead-light">
        <tr>
          <th>Personal Info</th>
        </tr>
        </thead>
        <tr>
          <th>Name:</th>
          <td>{{name.toUpperCase()}}</td>
        </tr>
        <tr>
          <th>Surname:</th>
          <td>{{surname}}</td>
        </tr>
        <tr>
          <th >Email:</th>
          <td>{{email}}</td>
        </tr>
        <tr>
          <th>Telephone No/ Mobile:</th>
          <td> +{{mobile}}</td>
        </tr>
      </table>
      <button @click="back" data-toggle="modal" data-target="#exampleModal" type="button" class="btn btn-secondary">Back</button>
    </section>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  inject: ['GStore'],
  data () {
    return {
      name: '',
      surname: '',
      email: '',
      mobile: ''
    }
  },
  computed: {
    ...mapGetters(['getUser', 'isUserAuth'])
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
        this.surname = responseData.surname.toLowerCase()
        this.mobile = responseData.mobile
        this.email = responseData.email
      } catch (error) {
        console.log(error)
      }
    },
    back () {
      this.$router.back()
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped>

</style>

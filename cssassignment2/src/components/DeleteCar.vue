<template>
  <section>
    <div class="details">
      <label class="toproundleft">Brand: </label><p class="toproundright">{{brand}}</p>
      <label>Model: </label><p>{{model}}</p>
      <label>Year: </label><p> {{year}}</p>

      <button  style="margin: 5% 5% 0 0" data-toggle="modal" data-target="#exampleModel" type="button" @click="deleteCar" class="btn btn-success" data-dismiss="modal">Yes</button>
      <button style="margin: 5% 0 0 0" type="button" @click="back" class="btn btn-danger" data-dismiss="modal">No</button>
    </div>
  </section>
</template>

<script>

export default {
  data () {
    return {
      brand: '',
      model: '',
      year: '',
      updateMode: false
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    /* async deleteCar () {
      // const id = this.$route.params.uID
      return fetch('https://cssassignment2-e31a9-default-rtdb.europe-west1.firebasedatabase.app/contact/ + id + '.json', {
        method: 'DELETE'
      })
        .then(response => {
          response.json()
          alert('Member Deleted')
          this.$router.push('/home')
        })
    }, */
    async getData () {
      console.log('Getting data')
      const id = this.$route.params.uID
      console.log(this.$route.params.uID)
      try {
        const response = await fetch('https://cssassignment2-e31a9-default-rtdb.europe-west1.firebasedatabase.app/contact/' + id + '.json', {
          method: 'GET'
        }) // the below will parse the data that's part of the response if it is in json format; returns a promise
        const responseData = await response.json()
        if (!response.ok) {
          console.log('Something went wrong')
        }
        // eslint-disable-next-line no-unused-expressions,no-sequences
        this.brand = responseData.brand,
        this.model = responseData.model,
        this.yom = responseData.yom
      } catch (error) {
        console.log(error)
        alert(error)
      }
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped>

.toproundleft{
  border-radius: 10px 0 0 0
}

.toproundright{
  border-radius: 0 10px 0 0
}

.bottomroundright{
  border-radius: 0 0 10px 0
}

.bottomroundleft{
  border-radius: 0 0 0 10px
}
</style>

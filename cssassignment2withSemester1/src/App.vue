<template>
  <div id="app">
    <navbar></navbar>
    <section class="section">
      <div class="container is-desktop">
      </div>
    </section>
    <!-- Main -->
    <div class="App">
      <div class="vertical-center">
        <div class="inner-block">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    Navbar
  },
  data () {
    return {
      kaas: true
    }
  },
  mounted () {
    this.authAction()
  },
  computed: {
    ...mapGetters(['getUser', 'isUserAuth'])
  },
  methods: {
    ...mapActions(['authAction'])
  }
}
</script>

<style lang="scss">

</style>

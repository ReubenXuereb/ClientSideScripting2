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
          <transition name="fade">
            <div v-if="GStore.flashMessage">
              {{ GStore.flashMessage }}
              <button @click="GStore.flashMessage = ''" class="btn btn-secondary">Close</button>
            </div>
          </transition>
          <router-view v-slot="{ Component }">
            <transition name="slide-fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  inject: ['GStore'],
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
/* SLIDE-FADE TRANSITION */

.slide-fade-leave-to {
  transform: translateX(50px);
  opacity: 0;
}

.slide-fade-enter-from{
  transform: translateX(-50px);
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  /* transition: opacity 1s ease-out; */
  transition: all 1s ease;
}

/* SLIDE-UP TRANSITION */

.slide-up-enter-from{
  transform: translateY(100px);
  opacity: 0;
}

.slide-up-enter-active {
  /* transition: opacity 1s ease-out; */
  transition: all 1s ease;
}

/* FADE TRANSITION */

/* What style are we starting from and leaving to? Invisible */
/* We are transitioning to opacity 1 which is the default so we do not need to add this */

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* What is the active entering and leaving style? */
.fade-enter-active {
  transition: opacity 1s ease-in;
}

.fade-leave-active {
  transition: opacity 1s ease-in;
}
</style>

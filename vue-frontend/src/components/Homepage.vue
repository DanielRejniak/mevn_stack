<template>
  <div class="hello">
    
    <!-- Hero Section -->
      <section class="hero is-fullheight is-default is-bold">
        <Navbar></Navbar>
        <div class="hero-head">
          </div>
            <div class="hero-body">
              <div class="container has-text-centered">
                <div class="columns is-vcentered">
                  <div class="column is-6">
                    <h1 class="title is-2">{{title}}</h1>
                    <h2 class="subtitle is-4">{{title_sub_heading}}</h2>
                    <br>
                    <p class="has-text-centered">
                      <a class="button is-medium is-info is-rounded is-large">
                        Learn more
                      </a>
                    </p>
                  </div>
                  <div class="column is-5">
                    <figure class="image is-4by3">
                      <img src="/static/worker.png" alt="Description">
                    </figure>
                  </div>
                  
                </div>
              </div>
            </div>
          </section> <!-- Herp Section End -->
  </div>
</template>

<script>
import firebase from 'firebase';
import axios from 'axios';
import Navbar from './Navbar'

export default {
  name: 'hello',
  components: {
    'Navbar': Navbar
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      title: 'Supper Clean Template',
      title_sub_heading: 'Create Crisp And Clean Applications'
    }
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>

<style scoped>
</style>

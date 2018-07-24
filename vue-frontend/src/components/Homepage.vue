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
                      <a class="button is-large is-info is-rounded is-large" v-on:click="generate_application">
                        Read More
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
      msg: 'test',
      title: 'Create Awsome Apps',
      title_sub_heading: 'Vuejs Stack'
    }
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    generate_application: function(){
      this.$router.replace('about')
    }
  }
}
</script>

<style scoped>
</style>

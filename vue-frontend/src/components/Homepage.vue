<template>
  <div class="hello">
    
    <!-- Hero Section -->
      <section class="hero is-fullheight is-default is-bold">
        <Navbar></Navbar>
        <div class="hero-head">
          </div>
            <div class="hero-body">
              <div class="container has-text-centered">
                <nav class="level">
                  <div class="level-item">
                    <figure class="image" style="width:50%">
                      <img src="/static/ibm-watson.gif" alt="Description">
                </figure>
                  </div>
                </nav>
                <div class="columns is-vcentered">
                  <div class="column is-12">
                    <h1 class="title is-2">{{title_sub_heading}}</h1>
                    <h2 class="subtitle is-4">{{title}}</h2>
                    <br>
                    <a class="button is-rounded is-primary is-medium" href="#/submit">
                      <span>Submit Report</span>
                    </a>
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
      title: 'Made Using IBM One Cloud',
      title_sub_heading: 'Autonomous Watson Emergency Drone Assistants'
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

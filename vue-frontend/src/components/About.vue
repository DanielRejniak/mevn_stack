<template>
  <div class="hello">
    <div class="container">
      <Navbar></Navbar>
    </div>
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
      msg: 'Welcome to Your Vue.js App'
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
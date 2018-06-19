<template>
  <div class="hello">
    <div class="container">
      
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import axios from 'axios';

export default {
  name: 'hello',
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
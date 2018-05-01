<template>
    <div class="login">
        <h3>Login</h3>
        <input text="text" v-model="email" placeholder="Email"><br>
        <input text="password" v-model="password" placeholder="Password"><br>
        <button v-on:click="login">Login</button>
        <p>You don't have an acount yet ? <router-link to="/register">Create one</router-link></p>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'login',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('hello')
        },
        function (err) {
          alert('Error : ' + err.message)
        }
      )
    }
  }
}
</script>

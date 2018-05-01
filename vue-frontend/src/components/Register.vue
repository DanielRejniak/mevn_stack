<template>
    <div class="Register">
        <h3>Register</h3>
        <input text="text" v-model="email" placeholder="Email"><br>
        <input text="password" v-model="password" placeholder="Password"><br>
        <button v-on:click="register">Register</button>
        <p>or go back to <router-link to="/login">login</router-link></p>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Register',
  data: function () {
    return {}
  },
  methods: {
    register: function () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        function (user) {
          alert('Account Has Been Created')
        },
        function (err) {
          alert('Error : ' + err.message)
        }
      )
    }
  }
}
</script>

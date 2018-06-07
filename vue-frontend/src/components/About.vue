<template>
  <div class="hello">
    <div class="container">
      <br>
    <nav class="navbar is-transparent">
                <div class="navbar-brand">
                    <a class="navbar-item" href="https://bulma.io">
                        <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
                            </a>
                    <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                
                <div id="navbarExampleTransparentExample" class="navbar-menu">
                    <div class="navbar-start">
                        <a class="navbar-item is-active" href="#/homepage">
                            Home
                        </a>
                        <a class="navbar-item is-active" href="#/about">
                            About
                        </a>
                    </div>
                    
                    <div class="navbar-end">
                        <div class="navbar-item">
                            <div class="field is-grouped">
                                <p class="control">
                                <a class="button is-rounded" href="#/login">
                                    <span>
                                        Login
                                    </span>
                                </a>
                                </p>
                                <p class="control">
                                <a class="button is-info is-rounded is-outlined" href="#/sign-up">
                                    <span>Register</span>
                                </a>
                                </p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
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
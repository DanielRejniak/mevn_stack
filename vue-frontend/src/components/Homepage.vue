<template>
  <div class="hello">
    
    <!-- Hero Section -->
      <section class="hero is-fullheight is-default is-bold">
        <div class="hero-head">
            <br>
            <div class="container">
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
                        <a class="navbar-item" href="#/homepage">
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
            <div class="hero-body">
              <div class="container has-text-centered">
                <div class="columns is-vcentered">
                  <div class="column is-5">
                    <figure class="image is-4by3">
                      <img src="https://picsum.photos/800/600/?random" alt="Description">
                    </figure>
                  </div>
                  <div class="column is-6 is-offset-1">
                    <h1 class="title is-2">Superhero Scaffolding</h1>
                    <h2 class="subtitle is-4">Let this cover page describe a product or service.</h2>
                    <br>
                    <p class="has-text-centered">
                      <a class="button is-medium is-info is-rounded">
                        Learn more
                      </a>
                    </p>
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

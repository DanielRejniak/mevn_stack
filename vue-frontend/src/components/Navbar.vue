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
                                <p class="control" v-if="is_loggedin == false">
                                <a class="button is-rounded is-medium" href="#/login">
                                    <span>
                                        Login
                                    </span>
                                </a>
                                </p>
                                <p class="control" v-if="is_loggedin == false">
                                <a class="button is-info is-rounded is-outlined is-medium" href="#/sign-up">
                                    <span>Register</span>
                                </a>
                                </p>
                                <p class="control" v-if="is_loggedin == true">
                        <a class="bd-tw-button button is-rounded is-danger is-outlined" target="_blank" v-on:click="logout">
                          <span>Logout</span>
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

export default {
  name: 'hello',
  data () {
      return {
          is_loggedin: ''
      }
  },
  
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  },
  created() {
    var self = this;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            self.is_loggedin = true
        } else {
            self.is_loggedin = false
        }
    });
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
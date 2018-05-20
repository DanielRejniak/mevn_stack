<template>
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
                    Sample Page
                </a>
            </div>
            
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="field is-grouped">
                        <p class="control">
                        <a class="bd-tw-button button is-rounded is-danger is-outlined" target="_blank" v-on:click="logout">
                          <span>Logout</span>
                        </a>
                        </p>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
        <section class="hero">
        <div class="hero-body">
          <div class="container">
            <div class="columns is-vcentered">
              <section class="hero is-info welcome is-small">
                    <div class="hero-body">
                        <div class="container">
                            <h1 class="title">
                                Hey, Good To See You.
                            </h1>
                            <h2 class="subtitle">
                                Let's Explore!
                            </h2>
                        </div>
                    </div>
</section>
          </div>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
import firebase from 'firebase';
import axios from 'axios';

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      current_email: ''
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
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      axios.post(`http://localhost:3000/private`, {
        firebaseToken: idToken
      })
      .then(response => {
        console.log(response.data.user)
        self.current_email = response.data.user
      })
      .catch(e => {
        this.errors.push(e)
      })
    }).catch(function(error) {
      console.log(error)
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

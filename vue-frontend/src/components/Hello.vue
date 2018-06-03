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
          <div class="notification is-info">
  <button class="delete"></button>
  Primar lorem ipsum dolor sit amet, consectetur
  adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Sit amet,
  consectetur adipiscing elit
</div>
<br>
{{current_email}}
          
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
      axios.post(`http://localhost:3000/private/events`, {
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

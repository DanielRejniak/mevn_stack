<template>
<div class="app">
  <div class="container">
        <Navbar></Navbar>
        <section class="hero">
          <div class="container">
          
          </div>
      </section>
        <br>
        
    </div>
    <footer class="footer">
  <div class="container">
    <div class="content has-text-centered">
      <p>
        <strong>Design</strong> by <a href="#">Daniel Rejniak</a>. The source code is licensed
        <a href="http://opensource.org/licenses/mit-license.php">MIT</a>
      </p>
    </div>
  </div>
</footer>
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
      msg: 'Welcome to Your Vue.js App',
      current_email: '',
      cards: [
        {
          county: 'Dublin',
          town: 'Malahide'
        },
        {
          county: 'Mayo',
          town: 'Ballina'
        },
        {
          county: 'Louth',
          town: 'Drogheda'
        },
        {
          county: 'Dublin',
          town: 'Swords'
        },
        {
          county: 'Dublin',
          town: 'Swords'
        },
        {
          county: 'Dublin',
          town: 'Swords'
        },
        {
          county: 'Dublin',
          town: 'Swords'
        },
        {
          county: 'Dublin',
          town: 'Swords'
        },
        {
          county: 'Dublin',
          town: 'Swords'
        }
      ]
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

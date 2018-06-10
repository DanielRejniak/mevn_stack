<template>
<div class="app">
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
          <div class="container">
            <br>
            <div class="notification is-primary">
              <div class="field-body">
    <div class="field">
      <div class="select is-fullwidth">
                  <select>
                    <option>Location</option>
                    <option>With options</option>
                  </select>
                </div>
    </div>
    <div class="field">
      <div class="select is-fullwidth">
                  <select>
                    <option>Discipline</option>
                    <option>With options</option>
                  </select>
                </div>
    </div>
    <div class="field">
      <div class="select is-fullwidth">
                  <select>
                    <option>Affiliation</option>
                    <option>With options</option>
                  </select>
                </div>
    </div>
    <div class="field">
      <div class="select is-fullwidth">
                  <select>
                    <option>Date</option>
                    <option>With options</option>
                  </select>
                </div>
    </div>
  </div>
            </div>

            <hr>
            <div class="notification is-info">
              4 Events Available
            </div>
            <br>

            <div class="columns is-multiline">
            <div class="column is-one-third" v-for="card in cards">
              <div class="card">
                <header class="card-header">
                  <p class="card-header-title">
                    {{card.county}} | {{card.town}}
                  </p>
                </header>
                <div class="card-content">
                  <div class="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.  
                    <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                    
                  </div>
                </div>
                <footer class="card-footer">
                  <a href="#" class="card-footer-item">View</a>
                  <a href="#" class="card-footer-item">Favourite</a>
                </footer>
              </div>
            </div>

            </div>

            

          </div>
      </section>
      <br>
      <section class="prgination">
        <nav class="pagination is-centered" role="navigation" aria-label="pagination">
  <ul class="pagination-list">
    <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
    <li><a class="pagination-link" aria-label="Goto page 2">2</a></li>
  </ul>
</nav>
        </section>
        <br>
        
    </div>
    <footer class="footer">
  <div class="container">
    <div class="content has-text-centered">
      <p>
        <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
        <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
        is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
      </p>
    </div>
  </div>
</footer>
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

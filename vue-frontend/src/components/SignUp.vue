<template>
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
                            <a class="navbar-item" href="#/homepage">
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
                                    <a class="button is-info is-rounded" href="#/sign-up">
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
                <h1 class="subtitle is-1">Register</h1>
            
            <div class="column is-4 is-offset-4">                                
                <div class="field">
                    <div class="control has-icons-left has-icons-right">
                      <input class="input is-radiusless" type="email" placeholder="Enter Your Email" v-model="email">
                      <span class="icon is-small is-left">
                        <i class="fas fa-envelope-square"></i>
                      </span>
                  </div>
                </div>
                <br>  
                <div class="field">
                  <div class="control has-icons-left has-icons-right">
                    <input class="input is-radiusless" type="password" placeholder="Enter Your Password" v-model="password">
                    <span class="icon is-small is-left">
                      <i class="fas fa-key"></i>
                    </span>
                  </div>
                </div>

                <br>
                                                                                          
                <button v-on:click="signUp" type="submit" class="button is-info is-fullwidth is-rounded is-bold">
                   <span>Register</span>
                </button>
                <br>
                <div class="control has-text-centered">
                  <p>Already registered, go back to <router-link to="/login">login</router-link></p>
                </div>
            </div>
          </div>
        </div>
    </section> <!-- End Of Hero Section-->
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'signUp',
    data: function() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signUp: function() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$router.replace('hello')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
      }
    }
  }
</script>

<style scoped>
</style>

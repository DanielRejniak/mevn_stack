<template>
<section class="hero is-fullheight is-default is-bold">
        <Navbar></Navbar>
        <div class="hero-body">
          <div class="container has-text-centered">
                <h1 class="subtitle is-1">Login</h1>
            
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
                                                                                          
                <button v-on:click="signIn" type="submit" class="button is-info is-fullwidth is-rounded is-bold">
                   <span>Login</span>
                </button>
                <br>
                <div class="control has-text-centered">
                  <p>Don't have an account yeat ? <router-link to="/sign-up">Create one</router-link></p>
                </div>
            </div>
          </div>
        </div>
    </section> <!-- End Of Hero Section-->
</template>


<script>
  import firebase from 'firebase'
  import Navbar from './Navbar'

  export default {
    name: 'login',
    components: {
      'Navbar': Navbar
    },
    data: function() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signIn: function() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
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

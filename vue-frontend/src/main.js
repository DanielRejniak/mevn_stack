// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

// Initialize Firebase

let app
let config = {
  apiKey: 'AIzaSyC8gPcYyQn_otdgFoHgzJS45FFlsHfV0yg',
  authDomain: 'test-project-e0286.firebaseapp.com',
  databaseURL: 'https://test-project-e0286.firebaseio.com',
  projectId: 'test-project-e0286',
  storageBucket: 'test-project-e0286.appspot.com',
  messagingSenderId: '404909952400'
}

firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
})

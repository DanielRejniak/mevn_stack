<template>
  <div class="hello">
    <div class="container">
      <Navbar></Navbar>
      <hr>
      <div class="has-text-centered">
        <h1 class="title is-1 as-text-centered">AWEDA Drone Report</h1>
    </div>
    <hr>
    <div class="columns">
  <div class="column is-12">
    <GmapMap
  :center=center_pointer
  :zoom="7"
  map-type-id="terrain"
  style="width: 100%; height: 300px"
>
  <GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    :clickable="true"
    :draggable="true"
    :label=m.label
    @click="center=m.position"
  />
</GmapMap>
  </div>
</div>
<div class="columns">
   <div class="column is-6">
    <div class="notification is-danger">
  <button class="delete"></button>
  <strong>Location A</strong>
  <hr>
  <ul>
    <li><strong>Priority</strong> : High</li>
    <li><strong>People Found</strong> : Yes</li>
    <li><strong>Num Of People Found</strong> : 10</li>
    <li><strong>Num Of People Wounded</strong> : 2</li>
    <li><strong>First Aid Kit Reguired</strong> : Yes</li>
    <hr>
    <a class="button is-fullwidth">View Actual Image</a>
  </ul>
</div>
</div>
<div class="column is-6">
    <div class="notification is-warning">
  <button class="delete"></button>
  <strong>Location B</strong>
  <hr>
  <ul>
    <li><strong>Priority</strong> : Medium</li>
    <li><strong>People Found</strong> : Yes</li>
    <li><strong>Num Of People Found</strong> : 5</li>
    <li><strong>Num Of People Wounded</strong> : 0</li>
    <li><strong>First Aid Kit Reguired</strong> : No</li>
    <hr>
    <a class="button is-fullwidth">View Actual Image</a>
  </ul>
</div>
</div>
  </div>
</div> 
    
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import axios from 'axios';
import Navbar from './Navbar'
import * as VueGoogleMaps from 'vue2-google-maps'

export default {
  name: 'hello',
  components: {
    'Navbar': Navbar
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      center_pointer: {lat: 18.077477, lng: -73.685007},
      markers: [
        { position: { lat: 18.101692, lng: -73.696010 },
          label: { 
            text: 'A'
          }
        },
        { position: { lat: 18.105771, lng: -73.692190 },
          label: 'B' 
        }
      ]
    }
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('homepage')
      })
    }
  }
}
</script>

<style scoped>
</style>
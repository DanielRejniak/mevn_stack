<template>
  <div class="hello">
    <div class="container">
      <Navbar></Navbar>
      <hr>
      <div class="has-text-centered">
        <h1 class="title is-1 as-text-centered">AWEDA Cognitive Report</h1>
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

<div class="columns is-multiline">
   <div class="column is-half" v-for="result in database_results">
    <article class="message">
      <div class="message-header">
    <p><strong>Marker Location : </strong>{{result.image_gps_location.label.text}}</p>
    <p><span class="tag is-danger">High Priority</span></p>
  </div>
      <div class="message-body">
      <strong>Watson Found People With Confidence Of : </strong>{{result.people_found_confidence}}%
      <hr>
      <strong>Injured : </strong>Yes
      <br>
      <strong>AID Kit Required : </strong>Yes
      <br>
      <strong>Fresh Water Required : </strong>Yes
      <hr>
      <a class="button is-fullwidth" @click="openReportModal(result.watson_assistant_chat_log)">View Full Chat Log</a>
      <br>
      <a class="button is-fullwidth" @click="openImageModal(result.image_id)">View Actual Image</a>
      </div>
  </article>
</div> 
  </div>

  <a class="button is-outline is-primary" @click="clearReports">Clear Reports</a>
</div> 
<br>
<div class="modal is-active" v-show="showImageModal">
  <div class="modal-background"></div>
  <div class="modal-content">
    <p class="image is-4by3">
      <img :src="/static/ + currentSelectedImageId" alt="">
      
      
    </p>
  </div>
  <button class="modal-close is-large" aria-label="close" @click="closeImageModal"></button>
</div>

<div class="modal is-active" v-show="showReportModal">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Watson Assistant Full Chat Log</p>
      <button class="delete" aria-label="close" @click="closeReportModal"></button>
    </header>
    <section class="modal-card-body">
      <ul>
        <div v-for="chat_item in currentSelectedChatLog">
          <strong>{{chat_item.sender}} : </strong>{{chat_item.message}}
        </div>
      </ul>
    </section>
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
    'Navbar': Navbar,
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      database_results: '',
      center_pointer: {lat: 34.050611, lng: -118.230169},
      markers: [],
      showImageModal: false,
      showReportModal: false,
      currentSelectedChatLog: [],
      currentSelectedImageId: ''
    }
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('homepage')
      })
    },
    closeImageModal() {
      this.showImageModal = false
    },
    openImageModal: function(imageName) {
      this.currentSelectedImageId = imageName
      this.showImageModal = true
    },
    closeReportModal() {
      this.showReportModal = false
    },
    openReportModal: function(chatLog) {
      this.showReportModal = true
      this.currentSelectedChatLog = chatLog
    },
    clearReports: function() {
      let url =`http://localhost:3000/public/clearReports`
      axios.get(url)
      .then(response => {
        this.database_result = response
      });
    }
  },
  created() {
    let url =`http://localhost:3000/public/retrieveReports`
    axios.get(url)
      .then(response => {
        this.database_results = response.data

        for(var i = 0; i < this.database_results.length; i++) {

          let location = { 
            position: { 
              lat: this.database_results[i].image_gps_location.position.lat, 
              lng: this.database_results[i].image_gps_location.position.lng 
            },
            label: { 
              text: this.database_results[i].image_gps_location.label.text
            }
          }

          this.markers.push(location)
        }
      });

    
  }
}
</script>

<style scoped>
</style>
<template>
  <div class="hello">
    <div class="container">
      <Navbar></Navbar>
      <hr>
      <div class="has-text-centered">
        <div class="notification is-info">
          <button class="delete"></button>
            <strong>Welcome AWEDA Report Dashboard.</strong> Currently we are displaying area of <strong>Los Angeles</strong> there are <strong>{{database_results.length}}</strong> reports for this area that require attention.
          </div>
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

  <div class="card">
    <div class="message-header">
    <p>Report : {{result.image_gps_location.label.text}}</p>

    <div v-if="result.people_found == 'true' && result.image_provided == 'true'">
      <p><span class="tag is-danger">High Priority</span></p>
    </div>

    <div v-if="result.people_found == 'false' && result.image_provided == 'true'">
      <p><span class="tag is-warning">Medium Priority</span></p>
    </div>

    <div v-if="result.image_provided == 'false'">
      <p><span class="tag is-success">Low Priority</span></p>
    </div>

  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-128x128">
          <img :src="/static/ + result.image_id" alt="Actual Image" @click="openImageModal(result.image_id)">
        </figure>
      </div>
      <div class="media-content">

        <div v-if="result.people_found == 'true' && result.image_provided == 'true'">
          <span class="icon has-text-success"><i class="fas fa-2x fa-check-square"></i></span>
          <p class="title is-4">Watson People Found</p>
          <p class="subtitle is-6"><strong>Location : </strong>{{result.location_name}}</p>
        </div>

        <div v-if="result.people_found == 'false' && result.image_provided == 'true'">
          <span class="icon has-text-warning"><i class="fas fa-2x fa-exclamation-triangle"></i></span>
          <p class="title is-4">Watson Did Not Find People</p>
          <p class="subtitle is-6"><strong>Location : </strong>{{result.location_name}}</p>
        </div>

        <div v-if="result.people_found == 'false' && result.image_provided == 'false'">
          <span class="icon has-text-danger"><i class="fas fa-2x has-text-danger"></i></span>
          <p class="title is-4">No Image Provided</p>
          <p class="subtitle is-6"><strong>Location : </strong>{{result.location_name}}</p>
        </div>

      </div>
    </div>
    <div class="content">
      <div v-for="(chat_item, index) in result.watson_assistant_chat_log" :key="index">
          <div v-if="chat_item.sender == 'Watson Assistant' && chat_item.message == 'Approximately how many people are with you?'">
            <p><strong>How many people found : </strong> {{result.watson_assistant_chat_log[index+1].message}}</p>
          </div>
      </div>
      <div v-for="(chat_item, index) in result.watson_assistant_chat_log" :key="index">
          <div v-if="chat_item.sender == 'Watson Assistant' && chat_item.message == 'Are any of you severely injured?' || chat_item.message == 'Are you severely injured?'">
            <p><strong>Severely injured : </strong> {{result.watson_assistant_chat_log[index+1].message}}</p>
          </div>
      </div>
      <div v-for="(chat_item, index) in result.watson_assistant_chat_log" :key="index">
          <div v-if="chat_item.sender == 'Watson Assistant' && chat_item.message == 'Do you have access to water that is safe to drink?'">
            <p><strong>Access to safe drinking water : </strong> {{result.watson_assistant_chat_log[index+1].message}}</p>
          </div>
      </div>
      <div v-for="(chat_item, index) in result.watson_assistant_chat_log" :key="index">
          <div v-if="chat_item.sender == 'Watson Assistant' && chat_item.message == ' Is there any danger present in your vicinity?'">
            <p><strong>Current danger : </strong> {{result.watson_assistant_chat_log[index+1].message}}</p>
          </div>
      </div>
      <div v-for="(chat_item, index) in result.watson_assistant_chat_log" :key="index">
          <div v-if="chat_item.sender == 'Watson Assistant' && chat_item.message == 'What do you need most in your current situation?'">
            <p><strong>What is needed : </strong> {{result.watson_assistant_chat_log[index+1].message}}</p>
          </div>
      </div>
    </div>
  </div>
  <footer class="card-footer">
    <a @click="openReportModal(result.watson_assistant_chat_log)" class="card-footer-item">View full conversation</a>
    <a @click="clearReport(result)" class="card-footer-item">Response Team Sent</a>
  </footer>
</div>


</div> 
  </div>

  <!-- <a class="button is-outline is-primary" @click="clearReports">Clear Reports</a> -->
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
      currentSelectedImageId: '',
      peopleFound: 'not_available',
      reportPriority: 'low'
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
        location.reload();
      });
    },
    clearReport: function(result) {

      let url =`http://localhost:3000/public/clearReport`

      let data = {
        id: result._id
      }

      console.log("Will Remove : " + result._id)

      axios.post(url,data)
        .then(response => {
          location.reload();
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
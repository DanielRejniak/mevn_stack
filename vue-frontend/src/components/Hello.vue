<template>
<div class="app">
  <div class="container">
        <Navbar></Navbar>
        <section class="hero">
          <div class="container">
            <br>
            <hr>
            <a class="button" @click="onPickFile">Upload Image</a>
            <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked">
            <a class="button" @click="reload_page">Reset</a>
            <hr>
            
            <div class="columns">
              <div class="column is-12">
                <figure class="image is-4by3">
                      <img :src="imageUrl">
                    </figure>
              </div>
              </div>
          </div>
          <div v-if="imageUrl != ''">
            <hr>
            <a class="button is-info is-fullwidth" @click="processImage">Send Drones To The Area</a>
              <div v-if="processingResult != ''">
                <hr>
                  <div class="tags" v-for="item in imageRecognitionKeyClasses">
                    <span class="tag is-danger is-large">{{ item.class }}</span>
                  </div>
               </div>
               <hr>
               <div v-if="peopleFound == true">
                 <div class="notification is-danger">
                    <button class="delete"></button>
                      <strong>Found People</strong>
                  </div>
              </div>
          </div>
      </section>
        <br>
        
    </div>
    <footer class="footer">
  <div class="container">
    <div class="content has-text-centered">
      <p>
        <strong>Design</strong> by <a href="#">WEDA Team</a>
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
      image: null,
      imageUrl: '',
      processingResult: '',
      imageRecognitionKeyClasses: '',
      peopleFound: ''
    }
  },
  methods: {

    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please Add A Valid File!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    },
    processImage() {
      var self = this;
      console.log(self.image)
      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      axios.post(`http://localhost:3000/private/watsonImageRecognition`, {
        firebaseToken: idToken,
        imageBody: self.image
      })
      .then(response => {
        self.processingResult = response.data
        self.imageRecognitionKeyClasses = response.data.images[0].classifiers[0].classes

        //Words That Describe People Crowd
        var crowdPeopleDescriptionKeys = ['people', 'crowd']

        //Boolean contition that specifies if people are found
        var numOfatttributesFound = self.imageRecognitionKeyClasses.length
        for(var i = 0; i < numOfatttributesFound; i++) {
          var currentAttribute = self.imageRecognitionKeyClasses[i].class
          for(var x = 0; x <  crowdPeopleDescriptionKeys.length; x++) {
            if(crowdPeopleDescriptionKeys[x].localeCompare(self.imageRecognitionKeyClasses[i])) {
              self.peopleFound = true
            }
          }
        }
      })
      .catch(e => {
        this.errors.push(e)
      })
    }).catch(function(error) {
      console.log(error)
    });
    },
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    reload_page: function() {
      location.reload();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

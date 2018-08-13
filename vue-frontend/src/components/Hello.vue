<template>
<div class="app">
  <div class="container">
        <Navbar></Navbar>
        <section class="hero">
          <div class="container">
            <br>
            <hr>

            <div class="columns">
            <div class="column is-6">
              <a class="button is-fullwidth" @click="onPickFile">Upload Image</a>
            <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked">
            </div>
            <div class="column is-6">
              <a class="button is-fullwidth" @click="reload_page">Reset</a>
            </div>
            </div>
            <VueSlideBar v-model="value"/>
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
            <a class="button is-fullwidth" @click="processImage">Analyze Photograph</a>
              <div v-if="processingResult != ''">
                <hr>
                  <div v-if="peopleFound == true">
                    <div class="notification is-danger">
                      <strong>Found People With Confidence Of {{imageRecognitionKeyClasses.score * 100 }}%</strong>
                    </div>
                    <hr>
                    <label class="label">Hi there, I am virtual assistant for emergency drone service. Do you require medical attention?</label>
                    <figure class="image is-64x64">
                      <img src="/static/microphone.png">
                    </figure>
                    <hr>
                    <a class="button is-outline is-link is-fullwidth" @click="generateReport">Generate Report</a>
                </div>
               </div>
               <hr>

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
import VueSlideBar from 'vue-slide-bar'

export default {
  name: 'hello',
  components: {
      'Navbar': Navbar,
      'VueSlideBar': VueSlideBar
    },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      current_email: '',
      image: null,
      imageName: '',
      imageUrl: '',
      processingResult: '',
      imageRecognitionKeyClasses: '',
      peopleFound: '',
      value: 80
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
      this.imageName = filename
      this.image = files[0]
    },
    processImage() {
      var self = this;
      console.log(self.image)
      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {

      let url =`http://localhost:3000/private/watsonImageRecognition`

      let data = {
        firebaseToken: idToken,
        message: self.msg,
        imageBody: self.image,
        imageName: self.imageName,
        threshold: self.value
      }

      // let formData = new FormData();
      // formData.append('image', self.image, self.imageName);
      //
      // const config = {
      //       headers: { 'content-type': 'multipart/form-data' }
      // }

      axios.post(url, data)
      .then(response => {
        self.processingResult = response.data
        self.imageRecognitionKeyClasses = response.data.images[0].classifiers[0].classes[0]

        if(parseFloat(self.imageRecognitionKeyClasses.score) >= parseFloat(self.value / 100)) {
          self.peopleFound = true
        } else {
          self.peopleFound = false
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
    },
    generateReport: function() {
      this.$router.replace('about')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

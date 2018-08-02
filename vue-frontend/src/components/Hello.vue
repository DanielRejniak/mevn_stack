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
            <a class="button is-primary is-fullwidth" @click="processImage">Send Drone To The Area</a>
            <hr>
              <div v-if="processingResult != ''">
                Image Recognition Result : {{processingResult}}
                <hr>
               </div>
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
      image: null,
      imageUrl: '',
      processingResult: ''
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
    },
    processImage() {
      var self = this;
      //let sampleAnswer = "{0,1,false},{0,1,false},{0,2,false},{1,0,false},{1,1,false},{1,2,false},{2,0,false},{2,1,true},{2,2,false}";
      //this.processingResult = sampleAnswer
      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      axios.post(`http://localhost:3000/private/watsonImageRecognition`, {
        firebaseToken: idToken
      })
      .then(response => {
        console.log(response.data.user)
        self.processingResult = response.data
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

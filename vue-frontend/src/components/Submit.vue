<template>
<div class="app">
  <div class="container">
        <Navbar></Navbar>
        <section class="hero">
          <div v-if="processingResult == '' && waitingForImageProcessing == false">
          <div class="container">
            <br>
            <hr>

            <div class="columns">
            <div class="column is-6">
              <a class="button is-rounded is-primary is-medium is-fullwidth" @click="onPickFile">Upload Image</a>
            <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked">
            </div>
            <div class="column is-6">
              <a class="button is-rounded is-fullwidth" @click="reload_page">Reset</a>
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
          </div>
          <div v-if="imageUrl != ''">
            <hr>
            <div v-if="processingResult == '' && waitingForImageProcessing == false">
              <a class="button is-outline is-primary is-fullwidth" @click="processImage">Analyze Photograph</a>
            </div>
            <div v-if="waitingForImageProcessing">
              <figure class="image is-2by2">
                  <img src="/static/ibm-watson.gif">
              </figure>
            </div>
              <div v-if="processingResult != ''">
                  <div v-if="peopleFound == true">
                    <div class="notification has-text-centered">
                      <strong>Found People With Confidence Of {{imageRecognitionKeyClasses.score * 100 }}%</strong>
                    </div>
                    <hr>

                    <div v-if="chatMessageQueue.length == 0">
                      <a class="button is-outline is-primary is-fullwidth" @click="processWatsonAssistantData">Interact With Watson Assistant</a>
                    </div>
                    <div v-for="answer in chatMessageQueue">
                      <div v-if="answer.sender == 'Watson Assistant'">
                        <div class="notification is-primary is-pulled-left">
                          <strong>{{answer.sender}} : </strong>{{answer.message}}
                       </div>
                       <br>
                       <br>
                      </div>
                      <div v-if="answer.sender == 'User'">
                        <div class="notification is-pulled-right">
                          <strong>{{answer.sender}} : </strong>{{answer.message}}
                       </div>
                       <br>
                       <br>
                      </div>
                    </div>
                    <br>
                    <div v-if="chatMessageQueue.length != 0">
                      <input v-on:keyup.enter="processWatsonAssistantData" class="input" type="text" placeholder="Ask Watson Assistant And Press Enter For Response" v-model="watsonAssistantChatInput">
                      <hr>
                      <a class="button is-outline is-primary has-text-centered" @click="generateReport">Generate Report</a>
                    </div>
                </div>
                <div v-if="peopleFound == false">
                  <div class="notification has-text-centered">
                      <strong>No People Found In The Image You Can Still Continue Conversation With Watson Assistant</strong>
                    </div>
                </div>
               </div>

          </div>
      </section>
      <br>

    </div>
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
      'VueSlideBar': VueSlideBar,
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
      value: 80,
      chatMessageQueue: [],
      watsonAssistantChatInput: '',
      waitingForImageProcessing: false
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
      this.waitingForImageProcessing = true
      let url =`http://node-backend:3000/public/watsonImageRecognition`

      console.log(this.image.name)

      let data = {
        message: this.msg,
        imageBody: this.image,
        imageName: this.image.name,
        threshold: this.value
      }

      console.log("Making Image Processing Request")

      axios.post(url, data)
      .then(response => {
        this.waitingForImageProcessing = false
        this.processingResult = response.data
        this.imageRecognitionKeyClasses = response.data.images[0].classifiers[0].classes[0]

        if(parseFloat(this.imageRecognitionKeyClasses.score) >= parseFloat(this.value / 100)) {
          this.peopleFound = true
        } else {
          this.peopleFound = false
        }
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    processWatsonAssistantData: function() {
        var user_response = {
          sender: 'User',
          message: this.watsonAssistantChatInput
        };

        if(this.watsonAssistantChatInput != '') {
          this.chatMessageQueue.push(user_response)
        }

        let data = {
          answer: this.watsonAssistantChatInput
        }

        let url =`http://node-backend:3000/public/watsonAssistant`

        console.log("Making Watson Assistant Request")

        axios.post(url, data)
        .then(response => {
          this.chatMessageQueue.push(response.data)
          this.watsonAssistantChatInput = ''
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

        let url =`http://node-backend:3000/public/generateJSONReport`

        let data = {
          image_recognition_confidence_score: this.imageRecognitionKeyClasses.score * 100,
          watson_assistant_conversation_log: this.chatMessageQueue,
          image_id: this.image.name,
          image_gps_location: { position: { lat: 18.101692, lng: -73.696010 },label: { text: 'A'}
        }
        }

        console.log("Generating JSON Report Request")

        axios.post(url, data)
        .then(response => {
          alert("Report Has Been Submitted")
          this.$router.replace('homepage')
        }).catch(e => {
          alert("There Was A Problem, Please Resubmit The Report")
          this.$router.replace('homepage')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

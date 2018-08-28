<template>
<div class="app">
  <div class="container">
        <Navbar></Navbar>
        <section class="hero">
          <div v-if="processingResult == '' && waitingForImageProcessing == false && chatMessageQueue.length == 0">
          <div class="container">
            <br>
            <hr>
            <div class="columns is-centered has-text-centered">
              <div class="column is-6">
                <figure class="image is-5by4">
                    <img :src="imageUrl" @click="onPickFile">
                </figure>
                <div v-if="image == null">
                  <small>Click the placeholder to upload an image</small>
                </div>
                <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked">

                <br>
                <div v-if="processingResult == '' && waitingForImageProcessing == false">
                  <div v-if="image != null">
                    <VueSlideBar v-model="value"/>

                      <small>Slider to adjust image recognition threshold</small>

                    <br>
                    <hr>
                    <a class="button is-outline is-rounded is-fullwidth" @click="processImage">Submit Image</a>
                  </div>
                <br>
                <div v-if="image == null">
                  <a class="button is-outline is-rounded is-fullwidth" @click="processWatsonAssistantData(false)">Continue Without Image</a>
                </div>
            </div>
              </div>
              </div>
          </div>
          </div>
          <div v-if="imageUrl != ''">

            <div v-if="waitingForImageProcessing">
              <figure class="image is-2by2">
                  <img src="/static/ibm-watson.gif">
              </figure>
            </div>
              <div v-if="processingResult != ''">
                  <div v-if="peopleFound == true">
                    <div class="notification has-text-centered">
                      <strong>Watson found people</strong>
                      <small>{{imageRecognitionKeyClasses.score * 100 }}% confident</small>
                    </div>
                    <hr>

                    <div v-if="chatMessageQueue.length == 0">
                      <a class="button is-outline is-primary is-fullwidth" @click="processWatsonAssistantData(true)">Interact with Watson Assistant</a>
                      <br>
                      <a class="button is-outline is-primary is-fullwidth" @click="generateReport">Submit report without Watson Assistant</a>
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
                      <input v-on:keyup.enter="processWatsonAssistantData" class="input" type="text" placeholder="Ask Watson Assistant and press enter for a response." v-model="watsonAssistantChatInput">
                      <hr>
                      <a class="button is-outline is-primary has-text-centered" @click="generateReport">Generate Report</a>
                    </div>
                </div>
                <div v-if="peopleFound == false">
                  <hr>
                  <div class="notification has-text-centered">
                      <strong>Watson didnt find any people in the image. You can still continue to provide further information as you can to assist with the situation.</strong>
                    </div>
                    <hr>
                    <div v-if="chatMessageQueue.length == 0">
                      <a class="button is-outline is-primary is-fullwidth" @click="processWatsonAssistantData(true)">Interact With Watson Assistant</a>
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
               </div>
               <div v-if="imageProvided == false && chatMessageQueue.length != 0">
                 <hr>
                 <div class="notification has-text-centered">
                      <strong>No image was provided. You can continue, or </strong><a @click="$router.go(-1)">re-upload</a><strong> the image to provide as much information as possible. </strong>
                    </div>
                    <hr>
                    <div v-if="chatMessageQueue.length == 0">
                      <a class="button is-outline is-primary is-fullwidth" @click="processWatsonAssistantData(false)">Interact With Watson Assistant</a>
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
                    <div v-if="chatMessageQueue.length != 0 && finishedConversation == false">
                      <input v-on:keyup.enter="processWatsonAssistantData(false)" class="input" type="text" placeholder="Ask Watson Assistant And Press Enter For Response" v-model="watsonAssistantChatInput">
                    </div>
                    <div v-if="chatMessageQueue.length != 0">
                      <hr>
                        <a class="button is-outline is-rounded has-text-centered" @click="generateReport">Generate Report</a>
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
      imageUrl: 'https://www.wesaturate.com/public/images/upload-placeholder.svg',
      processingResult: '',
      imageRecognitionKeyClasses: '',
      peopleFound: false,
      value: 80,
      chatMessageQueue: [],
      watsonAssistantChatInput: '',
      waitingForImageProcessing: false,
      imageProvided: false,
      conversationContext: '',
      finishedConversation: false,
      endpoint_hostname: 'localhost',
      endpoint_port: '3000'
      //endpoint_hostname: '159.122.175.35',
      //endpoint_port: '31491'

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

      // URL for backend watson image recognition API
      let url ='http://'+this.endpoint_hostname+':'+this.endpoint_port+'/public/watsonImageRecognition'

      this.imageProvided = true

      let data = {
        message: this.msg,
        imageBody: this.image,
        imageName: this.image.name,
        threshold: this.value
      }

      console.log("Making the image processing request to the backend. ")
      console.log(data)

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
    processWatsonAssistantData: function(imageProvidedData) {

        if(imageProvidedData) {
          this.imageProvided = true
        } else {
          this.imageProvided = false
        }

        var user_response = {
          sender: 'User',
          message: this.watsonAssistantChatInput
        };

        if(this.watsonAssistantChatInput != '') {
          this.chatMessageQueue.push(user_response)
        }

        let data = {
          answer: this.watsonAssistantChatInput,
          context: this.conversationContext
        }

        // URL for backend watson assistant 
        let url ='http://'+this.endpoint_hostname+':'+this.endpoint_port+'/public/watsonAssistant'

        console.log("Making Watson Assistant Request")

        axios.post(url, data)
        .then(response => {
          this.chatMessageQueue.push(response.data)
          this.watsonAssistantChatInput = ''
          this.conversationContext = response.data.context

          if(response.data.message == 'I will go away now, but I will come back to you as soon as I have information about your rescue') {
            this.finishedConversation = true
          }

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

        // URL for backend JSON report generator
        let url ='http://'+this.endpoint_hostname+':'+this.endpoint_port+'/public/generateJSONReport'

        var image_name_holder = ''

        if(this.image == null) {
          image_name_holder = 'no-image.png'
        } else {
          image_name_holder = this.image.name
        }

        let data = {
          watson_assistant_conversation_log: this.chatMessageQueue,
          image_id: image_name_holder,
          people_found: this.peopleFound,
          image_provided: this.imageProvided
        }

        console.log("Generating JSON Report Request")
        console.log("People found : " + this.peopleFound)
        console.log("Image Provided : " + this.peopleFound)

        axios.post(url, data)
        .then(response => {
          alert("Thank you for submitting the report. The information was sent to our response team.")
          this.$router.replace('homepage')
        }).catch(e => {
          alert("There was a problem, please resubmit the report")
          this.$router.replace('homepage')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

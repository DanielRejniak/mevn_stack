var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_KEY: '"AIzaSyC8gPcYyQn_otdgFoHgzJS45FFlsHfV0yg"',
  AUTH_DOMAIN: '"test-project-e0286.firebaseapp.com"',
  DATABASE_URL: '"https://test-project-e0286.firebaseio.com"',
  PROJECT_ID: '"test-project-e0286"',
  STORAGE_BUCKET: '"test-project-e0286.appspot.com"',
  MESSAGEING_SENDER_ID: '"404909952400"'
})

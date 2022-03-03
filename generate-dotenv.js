const fs = require('fs')

const {
  REACT_APP_NAME,
  REACT_APP_API_URL,
  REACT_APP_ENV,

  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
  REACT_APP_FIREBASE_DATABASE_URL,

  REACT_APP_FACEBOOK_ID,

  REACT_APP_PRIMARY_COLOR,
  REACT_APP_SECONDARY_COLOR,
  REACT_APP_TERTIARY_COLOR,
} = process.env

const config = {
  appName: REACT_APP_NAME,

  apiUrl: REACT_APP_API_URL,
  env: REACT_APP_ENV,

  Firebase: {
    apiKey: REACT_APP_FIREBASE_API_KEY,
    authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: REACT_APP_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: REACT_APP_FIREBASE_APP_ID,
    databaseUrl: REACT_APP_FIREBASE_DATABASE_URL,
  },

  facebookId: REACT_APP_FACEBOOK_ID,

  primaryColor: REACT_APP_PRIMARY_COLOR,
  secondaryColor: REACT_APP_SECONDARY_COLOR,
  tertiaryColor: REACT_APP_TERTIARY_COLOR,
}
console.log(config)
fs.writeFileSync('./constants/Config.js', 'module.exports = ')
fs.appendFileSync('./constants/Config.js', JSON.stringify(config, null, 2))

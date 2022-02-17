const fs = require('fs')

const {
  REACT_APP_API_URL,
  REACT_APP_ENV,
} = process.env

const settings = {
  apiUrl: REACT_APP_API_URL,
  env: REACT_APP_ENV,
}

fs.writeFileSync('./settings.js', 'module.exports = ')
fs.appendFileSync('./settings.js', JSON.stringify(settings, null, 2))

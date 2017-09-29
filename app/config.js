// APP: BAKE ###################################################################

'use strict';

// 1. DEPENDENCIES +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const yaml = require('js-yaml')
const fs = require('fs-extra')

let e

if (fs.pathExistsSync('./app.yml')) {
  e = yaml.load(fs.readFileSync('app.yml'))
} else {
  console.log('Error: You don\'t have an app.yml file. Please check the documentation!')
  process.exit(1)
}

// 1. END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// 2. BUILD CONFIG BY ENV ++++++++++++++++++++++++++++++++++++++++++++++++++++++

const env = process.env.NODE_ENV
let config = {}

if (env === 'development') {
  config = e.development
} else {
  console.log('No env set!')
  process.exit(1)
}

config.content_types = e.content_types

// 2. END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//if (env === 'development') { console.log(config)}

module.exports = config

// END OF FILE #################################################################

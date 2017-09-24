// APP: BAKE ###################################################################

'use strict';

// 1. DEPENDENCIES +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const yaml = require('js-yaml')
const fs = require('fs')
const e = yaml.load(fs.readFileSync('./app.yml'))

console.log(e)

// 1. END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
console.log(process.env.NODE_ENV)

module.exports = e

// END OF FILE #################################################################

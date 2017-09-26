// APP: UTIL: RENDER ###########################################################

'use strict';

// 1. DEPENDENCIES +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const fs = require('fs')
const q = require('q')

const cfg = require('../config')

// 1. END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// 2. SERVER +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const deferred = q.defer()

const process = async (DATA) => {

  //await ffs.mkdirRecursive(`${cfg.server.cache.path}/${DATA.name}`)
  
  //let poes = 'haai'

  return q.fcall( () => DATA )
  
}

// 2. END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = process

// END OF FILE #################################################################

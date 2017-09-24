// APP: CONTROLLER: BAKE #######################################################

'use strict';

// 1. DEPENDENCIES +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const express = require('express')
const ffs = require('final-fs')

const cfg = require('../config')

const cacheDir = `./${cfg.server.cache}`

// 1. END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// 2. SERVER +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const bake = async (req, res) => {

  // 2.1. DELETE & RECREATE CACHE DIR ..........................................

  if ( await ffs.exists(cacheDir) ) {
  
   await ffs.rmdir(cacheDir)

  }

  await ffs.mkdirRecursive(`./${cfg.server.cache}`)
  
  // 2.1. END ..................................................................

  // 2.2. END ..................................................................
  // 2.2. END ..................................................................

  return res.status(200).send({status: 'success', data: 'Created cache folder!'})

}

// 2. END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = bake

// END OF FILE #################################################################

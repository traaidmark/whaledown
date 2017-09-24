// APP: CONTROLLER: BAKE #######################################################

'use strict';

// 1. DEPENDENCIES +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const express = require('express')
const ffs = require('final-fs')

const cfg = require('../config')

// 1. END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// 2. SERVER +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const bake = async (req, res) => {

  // 2.1. DELETE & RECREATE CACHE DIR ..........................................

  if ( await ffs.exists(cfg.server.cache) ) {
  
   await ffs.rmdir(cfg.server.cache)
   await ffs.mkdirRecursive(cfg.server.cache)

  } else {
    await ffs.mkdirRecursive(cfg.server.cache)
  }
  
  // 2.1. END ..................................................................

  // 2.2. END ..................................................................
  // 2.2. END ..................................................................

  return res.status(200).send({status: 'success', data: 'Created cache folder!'})

}

// 2. END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = bake

// END OF FILE #################################################################

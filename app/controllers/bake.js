// APP: CONTROLLER: BAKE #######################################################

'use strict';

// 1. DEPENDENCIES +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const express = require('express')
const fs = require('fs-extra')
const moment = require('moment')

const cfg = require('../config')
const renderContent = require('../util/renderContent')
const renderListings = require('../util/renderListings')

// 1. END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// 2. SERVER +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

let content, listings

const bake = async (req, res) => {

  // 2.1. DELETE & RECREATE CACHE DIR ..........................................

  if ( await fs.pathExists(cfg.server.cache.path) ) {
  
   await fs.remove(cfg.server.cache.path)
   await fs.ensureDir(cfg.server.cache.path)

  } else {
    await fs.ensureDir(cfg.server.cache.path)
  }
  
  // 2.1. END ..................................................................

  // 2.2. RENDER CONTENT .......................................................


  try {

    content = await renderContent()

  } catch (error) {

    console.log(error)

    return res.status(500).send({status: 'error', data: 'It\'s not you, it\'s me. Sorry!'})

  }

  console.log(content)

  // 2.2. END ..................................................................

  // 2.3. RENDER LISTINGS ......................................................

  //console.log(await renderListings())

  // 2.3. END ..................................................................

  // 2.4. LOG ..................................................................

  let log = {   
    date: moment().format('YYYY-MM-DD'),
    process_time: 'N/A',
    content
  }

  // 2.4. END ..................................................................

  return res.status(200).send({status: 'success', data: log})

}

// 2. END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = bake

// END OF FILE #################################################################

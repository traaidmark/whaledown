// SERVER ######################################################################

'use strict';

// 1. DEPENDENCIES +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const express = require('express')
const ffs = require('final-fs')


const cfg = require('./config')
const bake = require('./bake.js')
const list = require('./listings.js')

// 1. END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// 2. SERVER +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const router = express.Router()
let data

// 2.1. ROOT ROUTE .............................................................

/*
ROUTE: /api
RETURNS: CONFIG OBJECT
DESCRIPTION: Returns the config object set in config.json
*/

router.get( '/', (req, res) => res.status(200).send(cfg) )

// 2.1. END ....................................................................

// 2.2. BAKE ...................................................................

/*
ROUTE: /api/bake
RETURNS: CONFIG OBJECT
DESCRIPTION: Runs the 
*/

router.get( '/bake', (req, res) => res.status(200).send( bake() ) )

// 2.2. END ....................................................................

// 2.3. CONTENT ................................................................

// 2.3.1. LISTINGS

router.get( '/listings/:type', async (req, res) => {

  if ( await ffs.exists('./build') ) {
    
    data = list(req.params.type)
    res.status(data.code).send({status: data.status, data: data.body})
  
  } else {

    res.status(503).send({status: 'error', data: 'The system hasn\'t baked any content yet. Try running: /api/bake.'})

  }

} )

// 2.3.1. END


router.get( '/content/:type/:slug', async (req, res) => {

  if ( await ffs.exists('./build') ) {
    
    data = list(req.params.type)
    res.status(data.code).send({status: data.status, data: data.body})
  
  } else {

    res.status(503).send({status: 'error', data: 'The system hasn\'t baked any content yet. Try running: /api/bake.'})

  }

} )

// 2.3. END ....................................................................

// 2. END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = router

// END OF FILE #################################################################

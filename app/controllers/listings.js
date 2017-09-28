// APP: CONTROLLER: CONTENT ####################################################

'use strict';

// 1. DEPENDENCIES +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const express = require('express')
const fs = require('fs-extra')
const moment = require('moment')

const cfg = require('../config')


const cacheDir = cfg.server.cache.path

// 1. END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// 2. SERVER +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const listings = async (req, res) => {

  // 2.1. BASIC VALIDATION .....................................................

  const type = cfg.content_types.filter( type => type.name === req.params.type)
  
  if (type.length === 0) {
    return res.status(404).send({status: 'error', data: 'Content type not found.'})
  } else {

    const file = `${cacheDir}/${req.params.type}/listings/page-${req.params.number}.json`
    let data, stat

    try {
      data = await fs.readJson(file)
      stat = await fs.stat(file)
      
    } catch (error) {
      return res.status(404).send({status: 'error', data: 'Resource not found.'})
    }

    return res.status(200).send({
      status: 'success', 
      created: moment(stat.birthtime).format('YYYY-MM-DD'),
      data
    })
    
  }
  
  // 2.1. END ..................................................................

}

// 2. END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = listings

// END OF FILE #################################################################

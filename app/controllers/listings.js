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
  }

  if (type[0].collection === 'false') {
    return res.status(500).send({status: 'error', data: 'Content type is not a collection.'})
  }
  const dir = `${cacheDir}/${req.params.type}/listings`
  const file = `${dir}/page-${req.params.number}.json`
  let data, stat, pages

  try {
    data = await fs.readJson(file)
    pages = await fs.readdir(dir)
    stat = await fs.stat(file)
    
  } catch (error) {
    console.log(error)
    return res.status(404).send({status: 'error', data: 'Resource not found.'})
  }

  let pageInfo = {
    current: parseInt(req.params.number, 10),
    total: pages.length,
    next: parseInt(req.params.number, 10) + 1,
    prev: parseInt(req.params.number, 10) - 1
  }

  if (pageInfo.current === pages.length) {
    pageInfo.next = false
  }
  if (pageInfo.current === 1) {
    pageInfo.prev = false
  }

  return res.status(200).send({
    status: 'success', 
    created: moment(stat.birthtime).format('YYYY-MM-DD'),
    pages: pageInfo,
    data: data.data
  })
  
  // 2.1. END ..................................................................

}

// 2. END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = listings

// END OF FILE #################################################################

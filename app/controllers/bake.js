// APP: CONTROLLER: BAKE #######################################################

'use strict';

// 1. DEPENDENCIES +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const express = require('express')
const fs = require('fs-extra')
const meta = require('markdown-it-meta')
const md = require('markdown-it')()
const moment = require('moment')

const cfg = require('../config')
const process = require('../util/contentProcess')

// 1. END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// 2. SERVER +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

md
  .use(meta)


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

  cfg.content_types.map( async type =>  {
    
    // 2.2.1. ADD DATA TO OBJECT
    
    type.content = cfg.data.path + cfg.data.content + '/' + type.name
    type.assets = cfg.data.path + cfg.data.assets
    
    // 2.2.1. END 
    
    // 2.2.2. PREPARE CONTENT DIRECTORIES

    await fs.ensureDir(`${cfg.server.cache.path}/${type.name}`)
    
    // 2.2.2. END 

    // 2.2.3. RENDER FILES

    let listings = []

    

    let contents = await fs.readdir(type.content)
    let contentLength = contents.length;

    contents.map( async (file, i) => {

      let fileName = file.slice(0, -3)
      
      let path = type.content + '/' + file
      let read = await fs.readFile(path, 'utf8')
      let render = await md.render(read.toString())

      if (render === '') {
        render = false
      }

      await fs.writeJson(
        `${cfg.server.cache.path}/${type.name}/${fileName}.json`,
        {
          body: render,
          fields: md.meta
        }
      )

    })
    
    // 2.2.3. END

  })

  // 2.2. END ..................................................................

  // 2.3. OPTIMISE ASSETS ......................................................

  // 2.3. END ..................................................................

  // 2.4. WRITE TO LOG .........................................................

  // 2.4. END ..................................................................

  return res.status(200).send({status: 'success', data: 'Created cache folder!'})

}

// 2. END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = bake

// END OF FILE #################################################################

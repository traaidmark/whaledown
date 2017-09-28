// APP: UTIL: RENDER ###########################################################

'use strict';

// 1. DEPENDENCIES +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const fs = require('fs-extra')
const meta = require('markdown-it-meta')
const md = require('markdown-it')()

const cfg = require('../config')

md
  .use(meta)

// 1. END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// 2. SERVER +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const renderContent = async (DATA) => {

  cfg.content_types.map( async type =>  {
    
    // 2.2.1. ADD DATA TO OBJECT
    
    type.content = cfg.data.path + cfg.data.content + '/' + type.name
    type.assets = cfg.data.path + cfg.data.assets
    
    // 2.2.1. END 
    
    // 2.2.2. PREPARE CONTENT DIRECTORIES

    await fs.ensureDir(`${cfg.server.cache.path}/${type.name}`)
    
    // 2.2.2. END 

    // 2.2.3. RENDER FILES

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
  
}

// 2. END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = renderContent

// END OF FILE #################################################################

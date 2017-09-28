// APP: UTIL: RENDER CONTENT ###################################################

'use strict';

// 1. DEPENDENCIES +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const fs = require('fs-extra')
const md = require('markdown-it')()
const meta = require('markdown-it-meta')

const cfg = require('../config')

md
  .use(meta)

// 1. END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// 2. RENDERING ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const renderContent = async (DATA) => {

  let data = []

  let types = cfg.content_types.map( async (type, i) =>  {

    // 2.2.1. ADD DATA TO THE TYPE OBJECT

    let counter = 0;
    let dirCounter = 1
    let teaserData = []
    let teasers = []
    
    type.content = cfg.data.path + cfg.data.content + '/' + type.name
    type.assets = cfg.data.path + cfg.data.assets
    
    // 2.2.1. END

    // 2.2.2. CREATE CONTENT CACHE DIRECTORIES

    let cacheDir = fs.ensureDirSync(`${cfg.server.cache.path}/${type.name}`)
    let teaserDir
    if (type.collection) {
      teaserDir = fs.ensureDirSync(`${cfg.server.cache.path}/${type.name}/listings`)
    }

    // 2.2.2. END

    // 2.2.3. READ CONTENT DIRECTORY

    let files = fs.readdirSync(type.content)

    // 2.2.3. END

    // 2.2.4. RENDER CONTENT

    let render = files.map( file => {

      let fileName = file.slice(0, -3)
      let path = type.content + '/' + file
    
      let read = fs.readFileSync(path, 'utf8')
      let render = md.render(read.toString())

      if (render === '') {
        render = false
      }

      // 2.2.4.1. Write pages out

      let write = fs.writeJsonSync(
        `${cfg.server.cache.path}/${type.name}/${fileName}.json`,
        {
          body: render,
          fields: md.meta
        }
      )

      // 2.2.4.1. End

      // 2.2.4.2. Write Teasers out

      if (type.collection) {
        
        if (type.collection.items == 0) {

          teasers.push(md.meta)

          fs.writeJsonSync(
            `${teaserDir}/page-${dirCounter}.json`,
            {
              data: teasers
            }
          )

        } else {

          if (counter < type.collection.items) {
            
            teasers.push(md.meta)
            counter++;
  
            if (counter === type.collection.items) {
              teaserData.push(teasers)
              fs.writeJsonSync(
                `${teaserDir}/page-${dirCounter}.json`,
                {
                  data: teasers
                }
              )
              counter = 0;
              teasers = []
              dirCounter++;
            }
          }

        }

      }

      // 2.2.4.2. End

    })

    // 2.2.4. END

    // 2.2.4. LOG WORK

    // 2.2.4. END

    return data.push({
      'name': type.name,
      'files': files.length,
    })

  })

  return Promise.resolve(data)
  
}

// 2. END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = renderContent

// END OF FILE #################################################################

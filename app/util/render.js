// APP: UTIL: RENDER ###########################################################

'use strict';

// 1. DEPENDENCIES +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const cfg = require('../config')

// 1. END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// 2. SERVER +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const render = (DATA) => {

  const listing = cfg.type.filter( type => type.name === TYPE)

  if (listing.length === 0) {
    return { code: 404, status: 'error', body: 'Content type not found.'}
  } else {
    return { code: 200, status: 'success', body: listing }
  }

  return listing
  
}

// 2. END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = render

// END OF FILE #################################################################

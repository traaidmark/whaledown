// APP: BAKE ###################################################################

'use strict';

// 1. DEPENDENCIES +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const express = require('express')

const cfg = require('../config')

// 1. END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// 2. SERVER +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const list = (TYPE) => {

  const listing = cfg.type.filter( type => type.name === TYPE)

  if (listing.length === 0) {
    return { code: 404, status: 'error', body: 'Content type not found.'}
  } else {
    return { code: 200, status: 'success', body: listing}
  }

  return listing
  
}

// 2. END ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = list

// END OF FILE #################################################################

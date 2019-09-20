'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  Base_URL:'"https://www.sl3.online"',
  FILE_URL:'"https://www.sl3.online/newjspgou/"'
})

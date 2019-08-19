// next.config.js
const withSass = require('@zeit/next-sass')
require('dotenv').config()
const webpack = require('webpack')

module.exports = withSass({
  /* config options here */
  webpack: (config) => {
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    )
    return config
  }
})



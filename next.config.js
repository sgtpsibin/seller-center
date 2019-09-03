// next.config.js
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
require("dotenv").config();
const webpack = require("webpack");

module.exports = withCSS(
  withSass({
    /* config options here */
    webpack: config => {
      config.plugins.push(new webpack.EnvironmentPlugin(process.env));
      return config;
    }
  })
);

'use strict';
const merge = require('webpack-merge');
const devEnv = require('./dev.env');

module.exports = merge(devEnv, {
  NODE_ENV: '"test"',
  BASE_URL: '"http://192.172.0.21:8081"',
});

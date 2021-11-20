const webpackConfigClient = require('./webpack.config.client');
const webpackConfigServer = require('./webpack.config.server');

module.exports = [
    webpackConfigServer,
    webpackConfigClient,
];

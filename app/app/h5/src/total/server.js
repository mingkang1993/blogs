var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.dev.config');
var config = require('./config');

config.publicPath = webpackConfig.output.publicPath;
new WebpackDevServer(webpack(webpackConfig), config).listen(config.port, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:' + config.port);
});
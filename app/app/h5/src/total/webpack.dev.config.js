var webpack = require('webpack');
var path = require('path');
var config = require('./config');
// var jsPath = '/h5/src/';

module.exports = {
  context : __dirname,
  // entry: './js/entry.js',
  entry: [
      'babel-polyfill',
      '../app.js',
     'webpack-dev-server/client?'+ config.path +':' + config.port,
     'webpack/hot/only-dev-server'
  ],
  output: {
    path: __dirname + '/h5/build/',    //资源文件输出地址
    filename: 'bundle.js',
    publicPath: '/h5/build/'   //资源文件地址
  },
  module: {
    loaders: [
      { test: /\.js?$|\.jsx$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        query: {
          "presets": ["es2015","react","stage-3"]
        }
      },
      { test: /\.css$/, loader: 'style!css' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
    // alias: {
    //   libs: __dirname + jsPath + '/h5/js/tools/libs/',
    //   weight: __dirname + '/h5/js/tools/weight/',
    //   src: __dirname + '/h5/js/src/'
    // }
  },
  // eslint: {
  //   configFile: path.join(__dirname, './.eslintrc.json')
  // },
  plugins: [
    // new webpack.OccurenceOrderPlugin(),   //引用次数的大小减少代码量
    // new webpack.AggressivieMerginPlugin(),   //减少代码,合并相识的代码
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
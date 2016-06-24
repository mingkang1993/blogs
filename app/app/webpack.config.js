var webpack = require('webpack');
var path = require('path');
var jsPath = '/h5/src/';

module.exports = {
  // context : __dirname,
  // entry: './js/entry.js',
  entry: {
    vendor: ['react'],
    bundle: [path.join(__dirname, jsPath + "app.js")]
    // 'webpack-dev-server/client?http://127.0.0.1:3000',
    // 'webpack/hot/only-dev-server',
  },
  output: {
    path: __dirname + '/h5/build/',
    filename: 'bundle.js',
    publicPath: __dirname + '/h5/build/'
  },
  module: {
    preLoaders: [
      { test: /\.js$|\.jsx$/, loader: "eslint-loader", exclude: /node_modules/ }
    ],
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test:  /\.js|jsx$/, loaders: ['react-hot', 'jsx?harmony'], exclude: /node_modules/ }
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
  watch: true,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
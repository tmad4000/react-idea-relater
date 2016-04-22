const TARGET = process.env.npm_lifecycle_event;


const path = require('path');
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');


const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

process.env.BABEL_ENV = TARGET;


const entryOutput = {
  entry: PATHS.app,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path:PATHS.build,
    filename:'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: PATHS.app,

      },
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.app
      }
    ]
  }

}


if(TARGET ==="start" || !TARGET)
  module.exports=Object.assign({
    devtool: 'source-map',

    devServer: {
      contentBase: PATHS.build,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT || 8080,


    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]

  },entryOutput)
else if(TARGET ==="build")
  module.exports=Object.assign({},entryOutput)

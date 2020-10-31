const CopyPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin')
const path = require('path')

module.exports = {
  mode: process.env.APP_ENV,
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    poll: 1000
  },
  entry: {
    index: './src/Index.tsx',
    background: './src/Background.ts'
  },
  output: {
    filename: 'assets/[name].js',
    path: path.resolve(__dirname, process.env.BUILD_PATH),
    sourceMapFilename: 'assets/map/[name].js.map'
  },
  devtool: 'inline-source-map',
  devServer: {
    inline: true,
    port: 3000,
    writeToDisk: true,
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx|)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  plugins: [
    new UnminifiedWebpackPlugin(),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          to: '.'
        }
      ]
    })
  ]
}

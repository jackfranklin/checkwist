const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const PROD = process.env.NODE_ENV === 'production'

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: '/',
    filename: 'index.[chunkhash:8].js',
    path: path.resolve(process.cwd(), 'dist'),
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(process.cwd(), 'logo.png'),
        to: 'logo.png',
      },
    ]),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './src/template.html',
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
    }),
    process.env.DEBUG &&
      new BundleAnalyzerPlugin({
        analyzerPort: 1235,
      }),
    PROD &&
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        parallel: true,
        mangle: {
          screw_ie8: true,
          keep_fnames: true,
        },
        compress: {
          screw_ie8: true,
          warnings: false,
        },
        comments: false,
      }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: { loader: 'babel-loader' },
        exclude: /node_modules/,
      },
      {
        test: /\.css/,
        use: ['css-to-string-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },
}

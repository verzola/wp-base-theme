const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const WebpackAssetsManifest = require('webpack-assets-manifest')
const WebpackBar = require('webpackbar')
const dev = process.env.NODE_ENV !== 'production'
const path = require('path')

module.exports = {
  mode: dev ? 'development' : 'production',
  devtool: 'source-map',
  entry: {
    main: './src/js/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: dev ? '[name].js' : '[name].[hash].js',
  },
  externals: {
    jquery: 'jQuery',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: process.env.BROWSERSYNC_PROXY || 'http://localhost',
      files: ['**/*.php'],
    }),
    new MiniCssExtractPlugin({
      filename: dev ? '[name].css' : '[name].[hash].css',
      chunkFilename: dev ? '[id].css' : '[id].[hash].css',
    }),
    new StyleLintPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new ImageminPlugin({
      disable: dev,
    }),
    new WebpackBar(),
    new WebpackAssetsManifest(),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          dev
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: './',
                },
              },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
}

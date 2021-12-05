const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { isDev, STATIC_DIR, BUILD_DIR } = require('./env');
const babelLoader = require('./webpack.babel.loader');

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    isDev && 'webpack-hot-middleware/client?noInfo=true',
    isDev && 'react-hot-loader/patch',
    isDev && 'css-hot-loader/hotModuleReplacement',
    './client/index.tsx',
  ].filter(Boolean),
  output: {
    filename: `${STATIC_DIR}/[name].js`,
    path: isDev ? __dirname : path.resolve(__dirname, BUILD_DIR),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '~features/*': './client/features/*',
    },
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      babelLoader,
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-preset-env',
                  'postcss-nested',
                  'postcss-simple-vars',
                  'postcss-color-mod-function',
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [
                  {
                    cleanupIDs: false,
                  },
                  {
                    prefixIds: false,
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin(),
    isDev ? new webpack.HotModuleReplacementPlugin() : '',
  ].filter(Boolean),
};

console.info(
  '--------------- Enviroment "mode" is:',
  process.env.NODE_ENV,
  '---------------',
);

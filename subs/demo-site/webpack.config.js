// @ts-check
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PnpWebpackPlugin = require(`pnp-webpack-plugin`)
const { getDemoContents } = require('./tools/demo-reader.js')
const { DefinePlugin } = require('webpack')

/** @type {() => Promise<webpack.Configuration>} */
module.exports = async () => {
  const demoContent = await getDemoContents()

  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.ts(x)?$/,
          loader: 'esbuild-loader',
          exclude: /node_modules/,
          options: {
            loader: 'tsx',
            target: 'es2017',
            jsx: 'automatic',
          },
        },
      ],
    },
    resolve: {
      plugins: [PnpWebpackPlugin],
      extensions: ['.tsx', '.ts', '.js'],
    },
    resolveLoader: {
      plugins: [PnpWebpackPlugin.moduleLoader(module)],
    },
    plugins: [
      new DefinePlugin({
        demoContent,
      }),
      new HtmlWebpackPlugin({
        templateContent: ({ htmlWebpackPlugin }) =>
          '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>' +
          htmlWebpackPlugin.options.title +
          '</title></head><body><div id="app"></div></body></html>',
        filename: 'index.html',
        title: 'CSAR - Context-less state with async reducers',
      }),
    ],
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
  }
}

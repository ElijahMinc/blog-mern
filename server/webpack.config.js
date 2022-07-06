
const webpack = require('webpack')
const path = require('path') 

let mode = 'development'
if (process.env.NODE_ENV === 'production') {
    mode = 'production'
}

module.exports = {
   mode: mode,
   target: 'node',
   entry: {
      index: path.resolve(__dirname, 'src/index.ts'),
   },
   output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].js',
      clean: true
   },
   resolve: {
      extensions: ['.ts', '.js'],
    },

    devtool: 'source-map',
    optimization: {
      splitChunks: {
         chunks(chunk) {
            // exclude `my-excluded-chunk`
            return chunk.name !== 'index.bundle';
          },
      },
   },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
         test: /\.m?js$/,
         exclude: /node_modules/,
         use: {
             loader: 'babel-loader',
             // options: {
             //     presets: ['@babel/preset-env']
             // }
         }
       }
      ],
    },
   externals: ['mongodb-client-encryption'],

}
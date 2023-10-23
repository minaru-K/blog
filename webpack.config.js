// require.resolve(/* webpackIgnore: true */"blabla")
const HTMLPlugin = require('html-webpack-plugin')
module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    devServer: {
        static: __dirname + 'dist',
        port: 8080
      },    
    plugins: [
        new HTMLPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    resolve: {
        extensions: ['.js'],
        fallback: {
        //     path: require.resolve("path-browserify"),
        //     crypto: require.resolve("crypto-browserify"),
            "babel-polyfill": require.resolve("@babel/polyfill"),
        //     buffer: require.resolve("buffer/"),
        //     stream: require.resolve("stream-browserify"),
          },
        //   webpackIgnore: true,
     
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    },

}

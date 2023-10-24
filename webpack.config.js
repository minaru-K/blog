// require.resolve(/* webpackIgnore: true */"blabla")
const HTMLPlugin = require("html-webpack-plugin");
module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
  },
  devServer: {
    static: __dirname + "dist",
    port: 8080,
  },
  plugins: [
    new HTMLPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
  resolve: {
    
    fallback: {
        // path: require.resolve("path-browserify"),
        // crypto: require.resolve("crypto-browserify"),
    // "babel-polyfill": require.resolve("@babel/polyfill"),
        // buffer: require.resolve("buffer/"),
        // stream: require.resolve("stream-browserify"),
        // "util": require.resolve("util/"),
        // "path": require.resolve("path-browserify")
        "util": false,
        "path": false,
        "crypto": false,
        "zlib": false,
        "stream": false,
        "buffer": false,
        "https": false,
        "http": false,
        "url": false,
        "vm":  false,
        "querystring": false,
        "os": false,
      },
      extensions: [".js"],
    //   webpackIgnore: true,
  },

  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }
    ]
  }
};

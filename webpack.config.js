const HTMLPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  devServer: {
    static: __dirname + "dist",
    hot: true,
    port: 8080,
  },
  plugins: [
    new HTMLPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
  resolve: {
      extensions: [".js"]
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
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

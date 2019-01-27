const { resolve } = require("path");
const merge = require("webpack-merge");
const base = require("./webpack.base");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const ExtractCssChunksPlugin = require("extract-css-chunks-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const sass = require("./loaders/sass");
const javascript = require("./loaders/javascript");
const abs = file => resolve(__dirname, "../../", file);

module.exports = merge(base, {
  mode: "development",

  devtool: "cheap-module-eval-source-map",

  devServer: {
    port: 8000,
    historyApiFallback: true,
    host: "localhost",
    publicPath: "/",
    hot: true,
    quiet: true,
    proxy: {
      "/api": {
        target: "http://localhost:8082",
        secure: false,
        changeOrigin: true,
      },
      "/auth": {
        target: "http://localhost:8082",
        secure: false,
        changeOrigin: true,
      },
    },
  },

  module: {
    rules: [
      javascript.linter,
      sass,
    ],
  },

  plugins: [
    new StyleLintPlugin(),
    new FriendlyErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: abs("config/template.ejs"),
    }),
    new ExtractCssChunksPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
      hot: true,
    }),
  ],
});

const { resolve } = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const image = require("./loaders/image");
const font = require("./loaders/font");
const javascript = require("./loaders/javascript");
const svg = require("./loaders/svg");
const video = require("./loaders/video");
const abs = file => resolve(__dirname, "../../", file);

module.exports = {
  stats: "none",

  resolve: {
    modules: [
      "node_modules",
      abs("src/styles"),
    ],
  },

  entry: [
    "babel-regenerator-runtime",
    abs("src/index.js"),
  ],

  output: {
    filename: "bundle.js",
    path: abs("build/assets"),
    publicPath: "/",
  },

  module: {
    rules: [
      javascript.base,
      svg,
      video,
      image,
      font,
    ],
  },

  plugins: [
    new CopyWebpackPlugin([{
      from: abs("src/assets"),
      to: "./assets",
    }]),
  ],
};

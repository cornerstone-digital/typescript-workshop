const ExtractCssChunksPlugin = require("extract-css-chunks-webpack-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
  entry: "./src/client/index.tsx",
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
            "style-loader",
            {
                loader: "css-loader",
            },
            "sass-loader?sourceMap",
        ],
      },
      { test: /\.tsx?$/, loader: "ts-loader" },
    ],
  },
  output: {
    filename: "build/app.js",
    path: __dirname + "/public",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};

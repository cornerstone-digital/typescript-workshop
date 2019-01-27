const ExtractCSSPlugin = require("extract-css-chunks-webpack-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
  entry: "./src/client/index.tsx",
  module: {
    rules: [
      {
        test: /\.(css|scss)(\?.+)?$/,
        use: [
          {
            loader: ExtractCSSPlugin.loader,
            options: {
              publicPath: "/assets/",
            },
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              localIdentName: "vfuk-[name]__[local]",
              modules: true,
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              parser: "postcss-scss",
              plugins: [
                autoprefixer({
                  browsers: [
                    "last 2 versions",
                    "IE >= 11",
                    "safari >= 10",
                  ],
                }),
              ],
            },
          },
          {
            loader: "sass-loader",
            options: {
              outputStyle: "expanded",
            },
          },
          {
            loader: "sass-resources-loader",
            options: {
              resources: [
                "./node_modules/@vfuk/web-core/resources/resources.scss",
                "./src/shared/styles/resources.scss",
              ],
            },
          },
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

module.exports = {
  test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
  use: {
    loader: "file-loader",
    options: {
      name: "fonts/[name].[ext]?[hash]",
      publicPath: "/",
    },
  },
};

module.exports = {
  rules: [
    {
      use: {
        loader: "url-loader", // === DataURL
        options: {
          limit: 8192, // Will use file-loader over this limit
          name: "images/[name].[ext]?[hash]",
          publicPath: "/assets/",
        },
      },
    },
    {
      use: {
        loader: "img-loader",
        options: {
          mozjpeg: {
            progressive: true,
            quality: 85,
          },
        },
      },
    },
  ],
  test: /\.(png|jpg|jpeg|gif|webp)(\?v=\d+\.\d+\.\d+)?$/,
};

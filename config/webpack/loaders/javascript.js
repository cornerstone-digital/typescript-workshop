const base = {
  test: /\.js$/,
  exclude: /(node_modules|bower_components)/,
  rules: [
    { use: 'babel-loader' }
  ]
}

const linter = {
  test: /\.js?$/,
  exclude: /(node_modules|bower_components)/,
  rules: [
    {
      use: {
        loader: 'standard-loader',
        options: { parser: 'babel-eslint' }
      }
    }
  ]
}

module.exports = {
  base,
  linter
}

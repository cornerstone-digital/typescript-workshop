const ExtractCSSPlugin = require('extract-css-chunks-webpack-plugin')
const autoprefixer = require('autoprefixer')
const loaders = [
  {
    loader: 'css-loader',
    options: {
      modules: true,
      importLoaders: 1,
      localIdentName: 'vfuk-[name]__[local]',
      sourceMap: true
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      parser: 'postcss-scss',
      plugins: [
        autoprefixer({
          browsers: [
            'last 2 versions',
            'IE >= 11',
            'safari >= 10'
          ]
        })
      ]
    }
  },
  {
    loader: 'sass-loader',
    options: {
      outputStyle: 'expanded'
    }
  },
  {
    loader: 'sass-resources-loader',
    options: {
      resources: [
        './node_modules/@vfuk/web-core/resources/resources.scss',
        './src/shared/styles/resources.scss'
      ]
    }
  }
]

module.exports = {
  test: /\.(css|scss)(\?.+)?$/,
  use: [
    {
      loader: ExtractCSSPlugin.loader,
      options: {
        publicPath: '/assets/'
      }
    },
    {
      loader: 'css-loader',
      options: {
        modules: true,
        importLoaders: 1,
        localIdentName: 'vfuk-[name]__[local]',
        sourceMap: true
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        parser: 'postcss-scss',
        plugins: [
          autoprefixer({
            browsers: [
              'last 2 versions',
              'IE >= 11',
              'safari >= 10'
            ]
          })
        ]
      }
    },
    {
      loader: 'sass-loader',
      options: {
        outputStyle: 'expanded'
      }
    },
    {
      loader: 'sass-resources-loader',
      options: {
        resources: [
          './node_modules/@vfuk/web-core/resources/resources.scss',
          './src/shared/styles/resources.scss'
        ]
      }
    }
  ]
}

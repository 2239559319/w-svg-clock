const pro = process.env.NODE_ENV === 'production'

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
const config = {
  publicPath: pro ? '/svg-clock/' : '/',
  configureWebpack: {
    devtool: pro ? false : 'source-map'
  }
}

module.exports = config

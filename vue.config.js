module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/deploy_eko/'
  : '/',
  "transpileDependencies": [
    "vuetify"
  ]
}
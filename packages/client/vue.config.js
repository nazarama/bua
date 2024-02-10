module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8084',
        ws: true,
        changeOrigin: true
      }
    }
  }
}


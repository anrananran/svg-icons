const shelljs = require('shelljs')

module.exports = function(api) {
  console.log('auto install latest @fe/packages')
  shelljs.exec('cnpm i -S @fe/packages', {
    async: false,
    silent: false
  })
}

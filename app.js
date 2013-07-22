var http = require('http')
var ecstatic = require('ecstatic')
var env = process.env

var port = env.PORT || 1337

module.exports = serveStatic
function serveStatic (cb) {
  http.createServer(
    ecstatic({ root: env.TEMPLOGPATH || '/data', showDir: true })
  ).listen(port, function () {
    console.log('ecstatic listening...')
    cb && cb()
  })
}

serveStatic.port = port
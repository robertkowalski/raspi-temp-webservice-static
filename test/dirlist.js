// builtins
var assert = require('assert')

// testhelper
var request = require('request')

// settings
var tempdir = __dirname + '/fixtures'

var env = process.env
env.TEMPLOGPATH = tempdir

// main module
var serveStatic = require('../app.js')
var url = 'http://127.0.0.1:' + serveStatic.port
var s

describe('static file serving', function () {
  beforeEach(function (done) {
    s = serveStatic(done)
  })
  afterEach(function (done) {
    s.close()
    done()
  })
  it('lists the files', function (done) {
    request(url, function (er, res, body) {
      assert.ok(body.indexOf('<a href="/data.csv">data.csv</a>') !== -1)
      done()
    })
  })
  it('delivers files with content', function (done) {
    request(url + '/data.csv', function (er, res, body) {
      assert.ok(body.indexOf('ente;ente\n') !== -1)
      assert.ok(body.indexOf('pato;pato\n') !== -1)
      done()
    })
  })
})

describe('config', function () {
  beforeEach(function (done) {
    env.BASEDIR = 'downloads'
    s = serveStatic(done)
  })
  afterEach(function (done) {
    s.close()
    done()
  })
  it('has a confirgurable basedir', function (done) {
    request(url + '/downloads/data.csv', function (er, res, body) {
      assert.ok(body.indexOf('ente;ente\n') !== -1)
      assert.ok(body.indexOf('pato;pato\n') !== -1)
      done()
    })
  })
})
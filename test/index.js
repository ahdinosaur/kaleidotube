const test = require('ava')

const kaleidotube = require('../')

test('kaleidotube', function (t) {
  t.truthy(kaleidotube, 'module is require-able')
})

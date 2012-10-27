entryPoint = lib.require('entryPoint')

describe 'when you get the entry point', () ->
    beforeEach () ->
      underTest = entryPoint({});

    it 'should have expected functions', () ->
      assert.isFunction(underTest.get);        
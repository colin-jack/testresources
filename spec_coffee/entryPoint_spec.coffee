entryPoint = lib.require('entryPoint')

describe 'when you get the entry point', () ->
  underTest = null  

  beforeEach () ->
    underTest = entryPoint({});

  it 'should have expected functions', () ->
    assert.isFunction(underTest.get);        
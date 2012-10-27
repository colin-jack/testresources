module.exports = (superTest) ->
  return {
    get : (url) ->
      superTest.get(url).expect('Content-Type', 'text/json')

  }

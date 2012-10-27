module.exports = (superTest) ->
  return {
    get : (url) ->
      superTest.get(url)
  }

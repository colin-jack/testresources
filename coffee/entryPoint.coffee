module.exports = (superTest) ->
  # TODO: returned object should have super test methods merged in.

  return {
    get : (url) ->
      getChain = superTest.get(url).expect('Content-Type', 'text/json')
      
      return {
        expectBody : (body) ->
          getChain.expect(200, body)
      }
  }

# TODO: returned object should have super test methods merged in.
module.exports = (wrappedSuperTest) ->
  return {
    get : (url) ->
      getChain = wrappedSuperTest.get(url).expect('Content-Type', 'text/json') 
      
      return {
        expectBody : (body) ->
          getChain.expect(200, body)
      }
  }
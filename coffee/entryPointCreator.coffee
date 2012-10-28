# TODO: returned object should have super test methods merged in.
module.exports = (wrappedSuperTest) ->
  return {
    get : (url) ->
      getChain = wrappedSuperTest.get(url).expect('Content-Type', /json/) 
      
      return {
        expectBody : (body) ->
          onEnd = (err, res) ->
            if (err) throw err;

          getChain.expect(200, body).end(onEnd)
      }
  }
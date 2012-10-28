module.exports = (superTest) ->
  return {
    get : (url) ->
      superTest.get(url)
        .expect('Content-Type', 'text/json')
        .expect(200)
      
      return {
        expectBody : (body) ->
          console.log("here")
      }
  }

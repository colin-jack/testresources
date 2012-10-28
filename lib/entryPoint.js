
module.exports = function(superTest) {
  return {
    get: function(url) {
      var getChain;
      getChain = superTest.get(url).expect('Content-Type', 'text/json');
      return {
        expectBody: function(body) {
          return getChain.expect(200, body);
        }
      };
    }
  };
};

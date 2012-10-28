
module.exports = function(wrappedSuperTest) {
  return {
    get: function(url) {
      var getChain;
      getChain = wrappedSuperTest.get(url).expect('Content-Type', 'text/json');
      return {
        expectBody: function(body) {
          return getChain.expect(200, body);
        }
      };
    }
  };
};

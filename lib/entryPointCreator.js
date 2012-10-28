var createChainable = function(getChain) {
  return {
        expectBody: function(body) {
          getChain = getChain.expect(200, body);
          return this;
        },
        end: function() {
          var onEnd = function(err, res){
            if (err) throw err;
          };

          getChain.end(onEnd);
        }
      };
};

module.exports = function(wrappedSuperTest) {
  return {
    get: function(url) {
      var getChain;
      getChain = wrappedSuperTest.get(url).expect('Content-Type', /json/);
      return createChainable(getChain);
    }
  };
};

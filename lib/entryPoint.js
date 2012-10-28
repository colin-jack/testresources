
module.exports = function(superTest) {
  return {
    get: function(url) {
      superTest.get(url).expect('Content-Type', 'text/json').expect(200);
      return {
        expectBody: function(body) {
          return console.log("here");
        }
      };
    }
  };
};

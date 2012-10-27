
module.exports = function(superTest) {
  return {
    get: function(url) {
      return superTest.get(url).expect('Content-Type', 'text/json');
    }
  };
};

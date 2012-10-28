var resource = lib.require('entryPointCreator'),
    express = require('express');

describe('when you get it to test a get request', function() {
    it('should pass if request returns expected json', function() {
        var app = express();

        app.get('/puppy', function(req, res){
          res.send({ name: 'fido' });
        });

        resource(app).get('/puppy').expectBody({name: 'fido'}).end();
    });

    it('should fail if request returns different json', function() {
        var app = express();

        app.get('/puppy', function(req, res){
          res.send({ name: 'fido' });
        });

        var validateError = function(err, res) {
            assert.isDefined(err)
            assert.instanceOf(err, Error);
        }

        resource(app).get('/puppy').expectBody({name: 'spot'}).end(validateError) 
    });
});

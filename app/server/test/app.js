var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');

var apihost = 'http://localhost:3000';

chai.use(chaiHttp);

describe('App', function() {

  describe('/GET tarifas', function() {

    it('it should GET tarifas index', function(done) {
      chai.request(apihost)
          .get('/tarifas')
          .end(function(err, res) {
              res.should.have.status(200);
            done();
          });
    });

  });

});

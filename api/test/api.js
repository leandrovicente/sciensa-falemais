var chai = require('chai');
var chaiHttp = require('chai-http');
var api = require('../api');
var should = chai.should();

var apihost = 'http://localhost:3001';

chai.use(chaiHttp);

describe('Api', function() {

  describe('/GET health test', function() {

        it('it should GET health', function(done) {
          chai.request(apihost)
              .get('/health')
              .end(function(err, res) {
                  res.should.have.status(200);
                  res.should.be.json;
                  res.body.should.have.property('message', 'Api running!');
                done();
              });
        });
    });

    describe('/GET calc test error', function() {
      it('it should calc a message without erro field', function(done) {
        chai.request(apihost)
            .get('/calc')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('message', 'bad request');
              done();
            });
      });
    });

    describe('/GET calc test', function() {
      it('it should GET the calc values', function(done) {
        chai.request(apihost)
            .get('/calc?from=011&to=016&minutes=20&plan=1')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('withPlan');
                res.body.should.have.property('withoutPlan');
              done();
            });
        });
    });

});

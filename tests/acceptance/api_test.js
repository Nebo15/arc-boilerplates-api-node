import app from './../../app';
import should from 'should';
import http from 'http';
import request from 'request';

let port = 3333;

let makeUrl = (path) => {
  return "http://localhost:" + port + path;
};

describe('app', () => {
  let httpServer = http.createServer(app);
  before((done) => {
    httpServer.listen(port, (err, res) => {
      console.log(err);
      done(err);
    });
  });

  after((done) => {
    httpServer.close();
    done();
  });

  it('should exist', (done) => {
    should.exist(app);
    done();
  });

  it('should be listening at localhost:3333', (done) => {
    request.get(makeUrl('/'), function (err, response) {
      response.statusCode.should.eql(200);
      done();
    });
  });

  it('check response from index', (done) => {
    request.get(makeUrl('/'), (err, response, body) => {
      response.statusCode.should.eql(200);
      let data = JSON.parse(body).data;
      data.should.have.property("id", 123);
      data.should.have.property("name", "Test");
      data.should.have.property("avatar", "http://link");
      data.should.have.not.property("hidden");
      done();
    });
  });
});

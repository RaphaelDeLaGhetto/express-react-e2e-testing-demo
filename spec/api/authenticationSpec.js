'use strict';                  
                               
const app = require('../../app');  
const http = require('http');  
const fixtures = require('pow-mongoose-fixtures');
const models = require('../../models');

//const models = require('../../db/config');
      
const PORT = process.env.NODE_ENV === 'production' ? 3000 : 3001; 

describe('authentication API', () => {

  let agent;
  beforeEach((done) => {
    fixtures.load(__dirname + '/../fixtures/agents.js', models.mongoose, (err) => {
      models.Agent.findOne({ email: 'daniel@example.com' }).then((results) => {
        agent = results;
        done();      
      }).catch((error) => {
        done.fail(error);
      });
    });
  });

  afterEach((done) => {
    models.mongoose.connection.db.dropDatabase().then((err, result) => {
      done();
    }).catch((err) => {
      done.fail(err);
    });
  });

  it('sends a 200 response and JWT if provided valid credentials', (done) => {
    let body = JSON.stringify({
      email: agent.email,
      password: 'secret'
    });

    let postOptions = {
      protocol: 'http:',
      host: 'localhost',
      port: PORT,
      path: '/agent/auth',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body)
      }
    };

    let request = http.request(postOptions, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        expect(response.statusCode).toEqual(200);
        expect(JSON.parse(data).token).not.toEqual(null);
        done();
      });
    });
    request.end(body);


  });


  it('sends a 401 response and JSON error message if provided an invalid password', (done) => {
    let body = JSON.stringify({
      email: agent.email,
      password: 'wrongpassword'
    });

    let postOptions = {
      protocol: 'http:',
      host: 'localhost',
      port: PORT,
      path: '/agent/auth',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body)
      }
    };

    let request = http.request(postOptions, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        expect(response.statusCode).toEqual(401);
        expect(JSON.parse(data)).toEqual({ error: 'Unauthorized' });
        done();
      });
    });
    request.end(body);

  });

//  describe('POST /search', () => {
//    it('sends a 401 response and JSON error message if no token provided', (done) => {
//      let body = JSON.stringify({
//        searchText: 'Some interesting text',
//      });
//
//      let postOptions = {
//        protocol: 'http:',
//        host: 'localhost',
//        port: PORT,
//        path: '/search',
//        method: 'POST',
//        headers: {
//          "Content-Type": "application/json",
//          "Content-Length": Buffer.byteLength(body)
//        }
//      };
//
//      let request = http.request(postOptions, (response) => {
//        let data = '';
//
//        response.on('data', (chunk) => {
//          data += chunk;
//        });
//
//        response.on('end', () => {
//          expect(response.statusCode).toEqual(401);
//          expect(JSON.parse(data)).toEqual({ error: 'No token provided' });
//          done();
//        });
//      });
//      request.end(body);
//    });
//
//    it('sends a 401 response and JSON error message if an invalid token provided', (done) => {
//      let body = JSON.stringify({
//        searchText: 'Some interesting text',
//        token: 'n0tth3rightToken'
//      });
//
//      let postOptions = {
//        protocol: 'http:',
//        host: 'localhost',
//        port: PORT,
//        path: '/search',
//        method: 'POST',
//        headers: {
//          "Content-Type": "application/json",
//          "Content-Length": Buffer.byteLength(body)
//        }
//      };
//
//      let request = http.request(postOptions, (response) => {
//        let data = '';
//
//        response.on('data', (chunk) => {
//          data += chunk;
//        });
//
//        response.on('end', () => {
//          expect(response.statusCode).toEqual(401);
//          expect(JSON.parse(data)).toEqual({ error: 'Invalid token' });
//          done();
//        });
//      });
//      request.end(body);
//    });
//  });
});



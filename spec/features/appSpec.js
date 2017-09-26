'use strict';                  

const app = require('../../app'); 
//const sinon = require('sinon');
//const http = require('follow-redirects').http;
//const https = require('follow-redirects').https;
//const PassThrough = require('stream').PassThrough;
//const fs = require('fs');
//const db = require('redis').createClient();

const Browser = require('zombie');
const PORT = process.env.NODE_ENV === 'production' ? 3000 : 3001; 
Browser.localhost('example.com', PORT);

describe('landing page', () => {

  let browser, document;
  beforeEach((done) => {
    browser = new Browser({ waitDuration: '30s', loadCss: false });
    //browser.debug();

    // document
    browser.on('loaded', (doc) => {
      document = doc;

      document.addEventListener('done-react', function listener(e) {
        e.target.removeEventListener(e.type, listener);
        done();
      });
    });
 
//    db.lpush('url-queue',
//               ['http://example.com/tagged example',
//                'http://example.com/some/path',
//                'http://example.com/some/other/path'],
//               (err, result) => {
//      if (err) done.fail(err);
      browser.visit('/', (err) => {
        if (err) done.fail(err);
        browser.assert.success();
      });
//    });
  });

  afterEach((done) => {
//    db.flushdb(() => {
      done();
//    });
  });

  describe('not authenticated', () => {
    it('displays the login form', () => {
      browser.assert.element('#login form input[name=email]');
      browser.assert.element('#login form input[name=password]');
      browser.assert.element('#login form input[type=submit]');
    });
  });

//  describe('authenticated', () => {
//    it('does not display the login form', () => {
//      browser.assert.elements('.submitter footer button#post-data-button', 0);
//      browser.assert.elements('.login #login-form input[name=email]', 0);
//      browser.assert.elements('.login #login-form input[name=password]', 0);
//      browser.assert.elements('.login #login-form input[type=submit]', 0);
//      browser.assert.elements('.login button#login-button', 0);
//    });
//  });
});




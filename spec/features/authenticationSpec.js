'use strict';                  

const app = require('../../app'); 
const fixtures = require('pow-mongoose-fixtures');
const Browser = require('zombie');
const models = require('../../models');

const PORT = process.env.NODE_ENV === 'production' ? 3000 : 3001; 
Browser.localhost('example.com', PORT);

describe('authentication UI', () => {

  let agent, browser, document;
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
 
    fixtures.load(__dirname + '/../fixtures/agents.js', models.mongoose, (err) => {
      models.Agent.findOne({ email: 'daniel@example.com' }).then((results) => {
        agent = results;
        browser.visit('/', (err) => {
          if (err) done.fail(err);
          browser.assert.success();
        });
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

  describe('not authenticated', () => {
    it('displays the login form', () => {
      browser.assert.element('#login form input[name=email]');
      browser.assert.element('#login form input[name=password]');
      browser.assert.element('#login form input[type=submit]');
    });
  });

  describe('authentication', () => {
    it('does not display login form after successfully authenticated', (done) => {
      document.addEventListener('done-react', (e) => {
        browser.assert.elements('#login form input[name=email]', 0);
        browser.assert.elements('#login form input[name=password]', 0);
        browser.assert.elements('#login form input[type=submit]', 0);
        browser.assert.element('button#logout-button');
 
        done();
      });
 
      browser
        .fill('email', agent.email)
        .fill('password', 'secret')
        .pressButton('Login', (err) => {
          if (err) done.fail(err);
        });
    });

    it('displays the login form and an error if authentication was unsuccessful', (done) => {
      document.addEventListener('done-react', (e) => {
        browser.assert.input('#login form input[name=email]', agent.email);
        browser.assert.element('#login form input[name=password]');
        browser.assert.element('#login form input[type=submit]');
        browser.assert.text('.error', 'Unauthorized');
        browser.assert.elements('button#logout-button', 0);
 
        done();
      });
 
      browser
        .fill('email', agent.email)
        .fill('password', 'wrongpassword')
        .pressButton('Login', (err) => {
          if (err) done.fail(err);
        });
    });

    it('renders a spinner while waiting for authentication response', (done) => {
      document.addEventListener('done-react', (e) => {
        browser.assert.elements('.spinner', 0);
        done();
      });
  
      browser.assert.elements('.spinner', 0);
      browser
        .fill('email', agent.email)
        .fill('password', 'secret')
        .pressButton('Login', (err) => {
          if (err) done.fail(err);
          browser.assert.elements('.spinner', 1);
        });
    });
  });

  describe('authenticated', () => {
    beforeEach((done) => {
      document.addEventListener('done-react', (e) => {
        done();
      });
 
      browser
        .fill('email', agent.email)
        .fill('password', 'secret')
        .pressButton('Login', (err) => {
          if (err) done.fail(err);
        });
    });

    it('displays the login form on logout', (done) => {
      document.addEventListener('done-react', (e) => {
        browser.assert.element('#login form input[name=email]');
        browser.assert.element('#login form input[name=password]');
        browser.assert.element('#login form input[type=submit]');
        browser.assert.elements('button#logout-button', 0);
 
        done();
      });

      browser.pressButton('Logout', (err) => {
        if (err) done.fail(err);
      });
    });
  });
});




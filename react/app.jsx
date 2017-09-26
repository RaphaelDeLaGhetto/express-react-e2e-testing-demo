const React = require('react');
const ReactDOM = require('react-dom');
const Login = require('./login.jsx');
//const Url = require('./url.jsx');
//const UrlAdder = require('./urlAdder.jsx');
//const UrlEditor = require('./urlEditor.jsx');
//const Page = require('./page.jsx');
const doneReact = require('./utils/doneReact');
 
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      token: null,
      waiting: true
    };
//    this.urlAdded = this.urlAdded.bind(this);
//    this.urlFetched = this.urlFetched.bind(this);
    this.setToken = this.setToken.bind(this);
//    this.recordUpdated = this.recordUpdated.bind(this);
  }

  componentWillMount() {
    this.setState(this.state, () => {
      document.dispatchEvent(doneReact);
    });
  }


  setToken(token) {

  }

  /**
   * Note the duplicate handlers for change and blur events. Zombie isn't firing
   * change events when inputs are filled. Blur does get fired, which lets the
   * tests pass.
   */
  render() {
    return <section>
             <Login onLogin={this.setToken} />
           </section>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

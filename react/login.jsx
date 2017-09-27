const React = require('react');
const ReactDOM = require('react-dom');
const doneReact = require('./utils/doneReact');
 
class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      waiting: false,
      error: null,
      message: null,
      token: null
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(e) {
    e.preventDefault();
    this.setState({ waiting: true });
    fetch('/agent/auth', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.email.value,
        password: this.password.value
      })
    }).then((response) => {
      return response.json();
    }).then((body) => {
      this.setState({ waiting: false, error: body.error, token: body.token, message: body.message }, () => {
        this.props.onLogin(this.state.token, () => {
          document.dispatchEvent(doneReact);
        });
      });
    });
  }

  logout() {
    this.setState({ waiting: false, error: null, token: null, message: null }, () => {
      this.props.onLogin(this.state.token, () => {
        document.dispatchEvent(doneReact);
      });
    });
  }

  render() {
    return <section id='login'>
             {
               this.state.token
                 ? <button id='logout-button' onClick={this.logout}>
                     Logout
                   </button>
                 : <form onSubmit={this.login}>
                     <div className='form-group'>
                       <label htmlFor='email'>Email:</label>
                       <input type='email' name='email'
                              placeholder='someguy@example.com'
                              ref={(input) => this.email = input} />
                     </div>
                     <div className='form-group'>
                       <label htmlFor='password'>Password:</label>
                       <input type='password' name='password' ref={(input) => this.password = input} />
                     </div>
                     <div className='form-group'>
                       <input type='submit' value='Login' />
                     </div>
                   </form>
             }
             { this.state.error ? <div className='error'>{this.state.error}</div> : null }
             { this.state.message ? <div className='message'>{this.state.message}</div> : null }
             { this.state.waiting ? <div className='spinner'></div> : null }
           </section>;
  }
}

module.exports = Login;

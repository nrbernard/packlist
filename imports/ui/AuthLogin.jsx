import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link, withRouter } from 'react-router';

class AuthLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: {} };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const router = this.props.router;
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const errors = {};

    if (!email) errors.email = 'Email required';
    if (!password) errors.password = 'Password required';

    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }

    Meteor.loginWithPassword(email, password, err => {
      if (err) {
        this.setState({
          errors: { none: err.reason },
        });
      } else {
        router.push('/');
      }
    });
  }

  render() {
    const { errors } = this.state;
    const errorMessages = Object.keys(errors).map(key => errors[key]);
    const errorClass = key => errors[key] && 'error';

    return (
      <div className="component register col-md-6 offset-md-3">
        <h1>Login</h1>

        <form onSubmit={this.onSubmit}>
          {errorMessages.map(msg => (
            <div className="alert alert-danger" role="alert" key={msg}>
              {msg}
            </div>
          ))}

          <div className="alert alert-warning" role="alert">
            <strong>Need an account?</strong> <Link to="/register">Register here</Link>.
          </div>

          <div className={`form-group input-symbol ${errorClass('email')}`}>
            <input className="form-control" type="email" name="email" ref="email" placeholder="Your Email" />
          </div>

          <div className={`form-group input-symbol ${errorClass('password')}`}>
            <input className="form-control" type="password" name="password" ref="password" placeholder="Password" />
          </div>

          <button type="submit" className="btn btn-primary btn-block">Get Packing</button>
        </form>
      </div>
    );
  }
}

export default withRouter(AuthLogin);

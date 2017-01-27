import React, { PropTypes, Component }      from 'react';
import { connect }                          from 'react-redux';
import {
  TextField,
  FlatButton,
  Paper
}                                           from 'material-ui';
import baseTheme                            from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme                          from 'material-ui/styles/getMuiTheme';

import {
  fetchLogin,
  hideError
}                                           from '../../redux/actions/userActions';

const propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

const defaultProps = {
  user: {},
  dispatch: () => {}
};

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  handleLogin() {
    this.props.dispatch(fetchLogin(
      this.inputUsername.input.value, this.inputPassword.input.value
    ));
  }

  handleChange() {
    this.props.dispatch(hideError());
  }

  render() {
    const errorMessage = this.props.user.error
    ? (
      <Paper
        id='errorMessage'
        style={{
          color: '#ff0000',
          padding: '8px',
          margin: '10px 0'
        }}
        zDepth={3}
      >
        {this.props.user.error}
      </Paper>
    )
    : '';

    return (
      <div>
        <div>
          <TextField
            className='inputUsername'
            type='text'
            hintText='Username / Email'
            onChange={this.handleChange}
            ref={input => this.inputUsername = input}
          />
        </div>
        <div>
          <TextField
            className='inputPassword'
            style={{ width: '100%' }}
            type='password'
            hintText='Password'
            onChange={this.handleChange}
            ref={input => this.inputPassword = input}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          {errorMessage}
          <FlatButton
            className='loginButton'
            backgroundColor='#3f51b5'
            hoverColor='#a4c639'
            style={{ width: '100%', color: '#fff' }}
            onClick={this.handleLogin}
          >
            Login
          </FlatButton>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;
LoginForm.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};
LoginForm.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const user = state.user;

  return {
    user
  };
}

export default connect(mapStateToProps)(LoginForm);

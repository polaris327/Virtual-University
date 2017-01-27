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
  fetchRegister,
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

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      valid: false,
      nameError: '',
      usernameError: '',
      emailError: '',
      passwordError: '',
      confirmationError: ''
    };
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  handleRegister() {
    if (this.state.valid) {
      this.props.dispatch(fetchRegister(
        this.inputName.input.value,
        this.inputUsername.input.value,
        this.inputEmail.input.value,
        this.inputPassword.input.value
      ));
    }
  }

  /**
   * This methos implements form validation
   */
  handleChange() {
    const state = this.state;
    const nameRegexp = /^[a-zA-Z\s]{1,25}$/;
    const usernameRegexp = /^[\w\.]{3,25}$/;
    const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line max-len
    const passwordRegexp = /^[\w\.\@\#\$\%\^\&\+\=]{8,}$/;

    state.valid = true;

    // Validate username
    if (!this.inputName.input.value) {
      state.valid = false;
    } else if (!nameRegexp.test(this.inputName.input.value)) {
      state.nameError = 'Real name must to be from 3 to 25 symbols long and may consists from next symbols: "a-Z"'; // eslint-disable-line max-len
      state.valid = false;
    } else {
      state.nameError = '';
    }

    // Validate username
    if (!this.inputUsername.input.value) {
      state.valid = false;
    } else if (!usernameRegexp.test(this.inputUsername.input.value)) {
      state.usernameError = 'Username must to be from 3 to 25 symbols long and may consists from next symbols: "a-Z, 0-9, _, ."'; // eslint-disable-line max-len
      state.valid = false;
    } else {
      state.usernameError = '';
    }

    // Validate email
    if (!this.inputEmail.input.value) {
      state.valid = false;
    } else if (!emailRegexp.test(this.inputEmail.input.value)) {
      state.emailError = 'This email address is not correct.';
      state.valid = false;
    } else {
      state.emailError = '';
    }

    // Validate password
    if (!this.inputPassword.input.value) {
      state.valid = false;
    } else if (!passwordRegexp.test(this.inputPassword.input.value)) {
      state.passwordError = 'Your password must to be minimum 8 symbols long and may consists from next symbols: "a-Z, 0-9, @, #, $, %, ^, &, +, ="'; // eslint-disable-line max-len
      state.valid = false;
    } else {
      state.passwordError = '';
    }

    // Validate confirm
    if (this.inputPassword.input.value !== this.inputConfirm.input.value) {
      state.confirmationError = 'Passwords are not equal';
      state.valid = false;
    } else {
      state.confirmationError = '';
    }

    this.setState(state);
    this.props.dispatch(hideError());
  }

  render() {
    const errorMessage = this.props.user.error
    ? (
      <Paper
        className='errorMessage'
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
            className='inputName'
            type='text'
            hintText='Real name'
            errorText={this.state.nameError}
            ref={input => this.inputName = input}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <TextField
            className='inputUsername'
            type='text'
            hintText='Username'
            errorText={this.state.usernameError}
            ref={input => this.inputUsername = input}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <TextField
            className='inputEmail'
            type='text'
            hintText='Email'
            errorText={this.state.emailError}
            ref={input => this.inputEmail = input}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <TextField
            className='inputPassword'
            type='password'
            ref={input => this.inputPassword = input}
            hintText='Password'
            errorText={this.state.passwordError}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <TextField
            className='inputConfirm'
            type='password'
            ref={input => this.inputConfirm = input}
            hintText='Confirm password'
            errorText={this.state.confirmationError}
            onChange={this.handleChange}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          {errorMessage}
          <FlatButton
            className='registerButton'
            backgroundColor={this.state.valid ? '#3f51b5' : '#bbb'}
            hoverColor='#a4c639'
            style={{ width: '100%', color: '#fff' }}
            onClick={this.handleRegister}
            disabled={!this.state.valid}
          >
            Register
          </FlatButton>
        </div>
      </div>
    );
  }
}

RegisterForm.propTypes = propTypes;
RegisterForm.defaultProps = defaultProps;
RegisterForm.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};
RegisterForm.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};


function mapStateToProps(state) {
  const user = state.user;

  return {
    user
  };
}

export default connect(mapStateToProps)(RegisterForm);

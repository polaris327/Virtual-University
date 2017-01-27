import React                                from 'react';
import { expect }                           from 'chai';
import sinon                                from 'sinon';
import {
  shallow,
  mount
}                                           from 'enzyme';
import getMuiTheme                          from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider                     from 'material-ui/styles/MuiThemeProvider';
import configureStore                       from '../../redux/configureStore';
import injectTapEventPlugin                 from 'react-tap-event-plugin';

if (!process.eventTapCalled) {
  injectTapEventPlugin();
}
process.eventTapCalled = true;

import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';

const store = configureStore();
const muiTheme = getMuiTheme({
  userAgent: 'node.js'
});

describe('components/User', () => {

  describe('<LoginForm />', () => {
    let wrapper;
    let unsubscribe;

    // Here we do virtual rendering of our component
    before(() => {
      wrapper = mount(
        <MuiThemeProvider muiTheme={muiTheme}>
          <LoginForm store={store} />
        </MuiThemeProvider>
      );
    });

    // This is sync test, which is checking how correctly component renders
    it('renders 2 input\'s, 1 button and 0 error messages', () => {
      expect(wrapper.find('input').length).to.equal(2);
      expect(wrapper.find('button').length).to.equal(1);
      expect(wrapper.find('.errorMessage').length).to.equal(0);
    });

    // This is async test, which is checking more long manipulations with state
    it('fires fetch request by click in button', (done) => {
      unsubscribe = store.subscribe(() => {
        expect(store.getState().user.action).to.equal('REQUEST_LOGIN_USER');
        unsubscribe();
        done();
      });

      wrapper.find('.loginButton').simulate('click');
    });
  });

  describe('<RegisterForm />', () => {
    let wrapper;

    before(() => {
      wrapper = mount(
        <MuiThemeProvider muiTheme={muiTheme}>
          <RegisterForm store={store} />
        </MuiThemeProvider>
      );
    });

    it('renders 5 input\'s, 1 button and 0 error messages', () => {
      expect(wrapper.find('input').length).to.equal(5);
      expect(wrapper.find('button').length).to.equal(1);
      expect(wrapper.find('.errorMessage').length).to.equal(0);
    });

  });
});
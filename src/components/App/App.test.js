import React                                from 'react';
import { expect }                           from 'chai';
import {
  render,
  shallow,
  mount
}                                           from 'enzyme';
import configureStore                       from '../../redux/configureStore';
import injectTapEventPlugin                 from 'react-tap-event-plugin';
import renderHtml                           from '../../helpers/render_html';

if (!process.eventTapCalled) {
  injectTapEventPlugin();
}
process.eventTapCalled = true;

import App from './App.prod.jsx';

import jsdom from 'jsdom';
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

const store = configureStore({
  menu: {
    items: [
      {
        label: 'item1',
        url: '/',
        icon: 'home'
      },
      {
        label: 'item2',
        url: '/',
        icon: 'home'
      },
      {
        label: 'item3',
        url: '/',
        icon: 'home'
      }
    ]
  }
});

describe('components/App', () => {

  describe('<App />', () => {
    let wrapper;

    before(() => {
      wrapper = mount(
        <App store={store} />
      );
    });

    it('renders Drawer with 3 menu items', () => {
      expect(wrapper.find('.menu-link').length).to.equal(3);
    });
  });

});
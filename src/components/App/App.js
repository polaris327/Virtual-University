import './App.css';
import injectTapEventPlugin                 from 'react-tap-event-plugin';

injectTapEventPlugin();

if (process.env.NODE_ENV === 'production') {
  console.log('Using production App');
  module.exports = require('./App.prod');
} else {
  console.log('Using development App');
  module.exports = require('./App.dev');
}

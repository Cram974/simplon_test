import {Meteor} from 'meteor/meteor';
import React from 'react';
import {render} from 'react-dom';

import './imports/styles/core.scss';

import App from './components/App';

Meteor.startup(() => {
  render(<App />, document.getElementById('app'));
});

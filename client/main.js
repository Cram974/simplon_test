import {Meteor} from 'meteor/meteor';
import React from 'react';
import {render} from 'react-dom';

import '../imports/ui/styles/core.scss';
import App from '../imports/ui/components/App';

Meteor.startup(() => {
  render(<App />, document.getElementById('app'));
});

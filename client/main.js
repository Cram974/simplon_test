import {Meteor} from 'meteor/meteor';
import React from 'react';
import {render} from 'react-dom';

import '../imports/locale';
import App from '../imports/ui/components/App';

Meteor.startup(() => {
  render(<App />, document.getElementById('app'));
});

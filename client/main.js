import {Meteor} from 'meteor/meteor';
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import '../imports/locale';
import App from '../imports/ui/components/App';

Meteor.startup(() => {
  render(
    <Router>
      <App />
    </Router>,
    document.getElementById('app')
  );
});

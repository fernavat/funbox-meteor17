import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Playlists } from '../../api/playlists/playlists.js';
//import { Lists } from '../../api/lists/lists.js';

import './root-redirector-2.html';

Template.app_rootRedirector_2.onCreated(() => {
  // We need to set a timeout here so that we don't redirect from inside a redirection
  //   which is a no-no in FR.
  Meteor.defer(() => {
    const playlist = Playlists.findOne()
    Session.set('selectedPlaylist', playlist._id)
    Session.set('selectedExtra', 'queue')
    FlowRouter.go('Playlists.show', playlist);
    
  });
});



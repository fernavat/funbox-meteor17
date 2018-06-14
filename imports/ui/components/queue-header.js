import './queue-header.html';
import * as VideoPlayer from '../../utils/videoPlayer.js';

import { Playlists } from '../../api/playlists/playlists.js';
Template.Queue_header.onCreated(function headerOnCreated() {
  this.state = new ReactiveDict();
  this.state.setDefault({
    menuOpen: false,
    userMenuOpen: false,
  });

});

Template.Queue_header.helpers({
  itemsCount(){
    return Session.get('localQueue').items.length
  }
})

Template.Queue_header.events({
  'click .vp-shuffle'(){
    VideoPlayer.shuffle()
  }
})



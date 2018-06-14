import './header.html'
import * as VideoPlayer from '../../utils/videoPlayer.js'

Template.Header.onCreated(function headerOnCreated() {
  this.state = new ReactiveDict()
  this.state.setDefault({
    menuOpen: false,
    userMenuOpen: false
  })
})


Template.Header.events({
  'click .vp-play-all'() {
    VideoPlayer.playAll(this._id)
  }
})

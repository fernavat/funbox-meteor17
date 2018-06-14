import { FlowRouter } from 'meteor/kadira:flow-router'
import './footer.html'

import * as VideoPlayer from '../../utils/videoPlayer.js'

Template.Footer.helpers({
  videoTitle() {
    const videoPlaying = Session.get('videoPlaying')
    if (videoPlaying) return videoPlaying.title
    return 'Nada tocando'
  }
})

Template.Footer.events({
  'click .title-page'() {
    const videoPlaying = Session.get('videoPlaying')
    if (videoPlaying) FlowRouter.go('/playing')
  },
  'click .vp-next'() {
    VideoPlayer.next()
  }
})
